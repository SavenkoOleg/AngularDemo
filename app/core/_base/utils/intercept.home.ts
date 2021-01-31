import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Logout } from '../../auth/auth.actions';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class InterceptHome implements HttpInterceptor {

	constructor(
		private router: Router,
		private store: Store<AppState>
	) {}

	intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({ setHeaders: { Authorization: localStorage.getItem(environment.authTokenKey) } });
		return next.handle(request).pipe(
			tap(
				event => {},
				error => {
					if (error.status === 401 || error.status === 504) { this.store.dispatch(new Logout()); }
					return throwError(error);
					}),
			catchError(err => throwError(err)) );
	}
}
