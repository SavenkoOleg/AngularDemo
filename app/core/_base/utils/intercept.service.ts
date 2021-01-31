import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthNoticeService} from '../../auth/auth-notice/auth-notice.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Logout, Register, ToggleLoading} from '../../auth/auth.actions';
import {Router} from '@angular/router';

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private router: Router,
	) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(
				event => {
					if (event['status'] === 200) {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.SUCCESS'), 'success');
						setTimeout(() => { this.authNoticeService.setNotice('', ''); }, 3000);
					}
					 if (event instanceof HttpResponse) {
					 	request = request.clone({ setHeaders: { Authorization: '' } });
					 	return next.handle(request);
					}
				},
				error => {
					if (error.status === 504) {
						this.store.dispatch(new ToggleLoading(false));
						this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.ERROR504'), 'danger');
						setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
					}
					if (error.status === 409) {
						this.store.dispatch(new ToggleLoading(false));
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.EMAIL'), 'danger');
						setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
					}
					if (error.status === 404) {
						this.store.dispatch(new ToggleLoading(false));
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND'), 'danger');
						setTimeout(() => { this.authNoticeService.setNotice('', '');}, 3000);
					}
					if (error.status === 401) {
						if (error.statusText === 'Unauthorized') { this.store.dispatch(new Logout());
						} else { this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.PASS_INVALID'), 'danger'); }
					}
					if (error.status === 400) { this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger'); }
				}
			),
			catchError(err => throwError(err))
		);
	}
}
