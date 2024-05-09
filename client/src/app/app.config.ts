import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withInterceptors([errorHandlerInterceptor, tokenInterceptor])), CookieService, provideCharts(withDefaultRegisterables())],
};
