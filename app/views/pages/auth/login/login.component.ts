import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import {environment} from '../../../../../environments/environment';
import {IAppState} from '../../../../core/app.state';
import {Loading} from '../../../../core/auth/auth.selectors';
import {ToggleLoading} from '../../../../core/auth/auth.actions';

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	loading$ = this._store.pipe(select(Loading));
	private unsubscribe: Subject<any>;

	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private _store: Store<IAppState>
	) {
		this.unsubscribe = new Subject();
		localStorage.setItem(environment.authTokenKey, '');
	}

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this._store.dispatch(new ToggleLoading(false));
	}

	initLoginForm() {
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	submit() {
		const controls = this.loginForm.controls;
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this._store.dispatch(new ToggleLoading(true));

		const authData = {
			email: controls['email'].value,
			password: controls['password'].value
		};
		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({authToken: user.accessToken}));
						this.router.navigateByUrl('/home/general');
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => this._store.dispatch(new ToggleLoading(false)) )
			)
			.subscribe();
	}
}
