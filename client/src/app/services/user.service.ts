import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserSignIn } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    private url = 'http://localhost:3000/user/';

    newUser(user: User) {
        return this.http.post(this.url + 'new', user);
    }
    signin(user: UserSignIn) {
        return this.http.post(this.url + 'signIn', user);
    }
}
