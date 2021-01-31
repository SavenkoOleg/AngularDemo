import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {tap, withLatestFrom, filter, catchError, switchMap} from 'rxjs/operators';
import {of, Observable, defer, throwError} from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import {AuthActionTypes, Login, Logout, Register, UserRequested, UserLoaded, EditAccountData, EditPassword} from './auth.actions';
import { AuthService } from './auth.service';
import { AppState } from '../reducers';
import { environment } from '../../../environments/environment';
import { isUserLoaded } from './auth.selectors';

@Injectable()
export class AuthEffects {

	handleError(error) {
		let errorMessage: string = '';
		if (error.error instanceof ErrorEvent) { errorMessage = `Error: ${error.error.message}`;
		} else { errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; }
		return throwError(errorMessage);
	}

	@Effect()
	editPassword = this.actions$.pipe(
		ofType<EditPassword>(AuthActionTypes.EditPassword),
		tap(action => {})
	);

    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            this.store.dispatch(new UserRequested());
        }),
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.authTokenKey);
            this.router.navigateByUrl('/auth/login');
        })
    );

    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);
        })
    );

	@Effect({dispatch: false})
	EditAccountData$ = this.actions$
		.pipe(
			ofType<EditAccountData>(AuthActionTypes.EditAccountData),
			switchMap((action) => this.auth.editAccountData(action.payload, action.typeData)),
			tap(_user => {
				// if (_user) {
				// 	this.store.dispatch(new StatusLoadAccount(false));
				// 	this.store.dispatch(new UserLoaded({ user: _user }));
				// } else { this.store.dispatch(new Logout()); }
			}),
			catchError(this.handleError)
		);

    @Effect({dispatch: false})
    loadUser$ = this.actions$
    .pipe(
        ofType<UserRequested>(AuthActionTypes.UserRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        switchMap(() => this.auth.getUserByToken()),
        tap(_user => {
            if (_user) {
                this.store.dispatch(new UserLoaded({ user: _user }));
            } else {
                this.store.dispatch(new Logout());
            }
        }),
		catchError(this.handleError)
      );

    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({  authToken: userToken }));
        }
        return observableResult;
    });

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>) { }
}
