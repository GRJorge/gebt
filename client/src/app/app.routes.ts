import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { UnknowErrorComponent } from './components/error/unknow-error/unknow-error.component';
import { InternalErrorComponent } from './components/error/internal-error/internal-error.component';

export const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'signup', title: 'Create account', component: SignUpComponent },
    { path: 'signin', title: 'Iniciar sesión', component: SignInComponent },
    { path: 'unknow', title: 'Error desconocido', component: UnknowErrorComponent },
    { path: 'internal', title: 'Error interno', component: InternalErrorComponent },
];
