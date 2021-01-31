import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InterceptService } from '../../../core/_base/utils/intercept.service';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { AuthService, authReducer, AuthGuard, AuthEffects  } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
			{ path: 'forgot-password', component: ForgotPasswordComponent },
			{ path: 'error', loadChildren: 'app/views/pages/404/error.module#ErrorModule' }
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
				AuthService,
				AuthGuard
            ]
        };
    }
}
