import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
    { path: 'signup', title: 'Create account', component: SignUpComponent },
    { path: 'signin', title: 'Iniciar sesión', component: SignInComponent },
];
