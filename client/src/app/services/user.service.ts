import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserSignIn } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

    private url = `${environment.apiUrl}user/`;

    newUser(user: User) {
        return this.http.post(this.url + 'new', user);
    }
    signin(user: UserSignIn) {
        return this.http.post(this.url + 'signIn', user);
    }
    verifyToken() {
        //VERIFICAR SI EXISTE EL COOKIE
        if (this.cookieService.check('session')) {
            //VERIFICAR EN EL SERVIDOR SI EL TOKEN ES VALIDO
            this.http.post(this.url + 'verifytoken', {}).subscribe({
                error: () => {
                    this.router.navigate(['/signin']);
                    this.cookieService.delete('session');
                },
            });
        } else {
            this.router.navigate(['/signin']);
        }
    }
    get() {
        return this.http.get(this.url + 'get');
    }
    changeName(name: string, lastname: string) {
        return this.http.patch(this.url + 'changeName', { name, lastname });
    }
    changePassword(actualPassword: string, newPassword: string) {
        return this.http.patch(this.url + 'changePassword', { actualPassword, newPassword });
    }
}
