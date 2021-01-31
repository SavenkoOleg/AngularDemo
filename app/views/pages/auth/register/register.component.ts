import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {catchError, finalize, takeUntil, tap} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject, throwError } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { Loading } from '../../../../core/auth/auth.selectors';
import { ToggleLoading } from '../../../../core/auth/auth.actions';
import { IAppState } from '../../../../core/app.state';

@Component({
	selector: 'kt-register',
	styleUrls: ['./register.component.scss'],
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {

	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private _store: Store<IAppState>
	) {
		this.unsubscribe = new Subject();
	}

	registerForm: FormGroup;
	loading$ = this.store.pipe(select(Loading));
	private unsubscribe: Subject<any>;

	ngOnInit() {
		this.initRegisterForm();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this._store.dispatch(new ToggleLoading(false));
	}

	initRegisterForm() {
		this.registerForm = this.fb.group({
			first_name: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(50)
				]) ],
			number: ['', Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(12)
				]) ],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(5),
				Validators.maxLength(70)
				]) ],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(50)
				]) ],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(50)
				]) ],
			agree: [false, Validators.compose([Validators.required])] },
			{ validator: ConfirmPasswordValidator.MatchPassword });
	}

	submit() {
		const controls = this.registerForm.controls;
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched() );
			return;
		}
		if (!controls['agree'].value) {
			this.authNoticeService.setNotice('Вам необходимо согласиться с правилами и условиями', 'danger');
			setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
			return;
		}

		this.store.dispatch(new ToggleLoading(true));

		const _user: User = new User();
			_user.email = controls['email'].value;
			_user.phone_number = controls['number'].value;
			_user.first_name = controls['first_name'].value;
			_user.password = controls['password'].value;

		this.auth.register(_user).pipe(
			catchError(err => {
				this._store.dispatch(new ToggleLoading(false));
				return throwError(err);
			}),
			tap(user => {
				if (user) {
					this.store.dispatch(new Register({authToken: user.accessToken}));
					this.router.navigateByUrl('/auth/login');
					this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
					setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
				}
			}),
			finalize(() => {
				this._store.dispatch(new ToggleLoading(false));
				this.cdr.detectChanges();
			}),
		).subscribe();
	}
}
