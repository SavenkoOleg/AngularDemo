import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {typeData, User} from './user.model';
import { map, catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_USERS_URL = 'api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

	public requestPassword(email: string): Observable<any> {
		return this.http.post(API_USERS_URL + '/recovery', {email})
			.pipe(catchError(this.handleError('forgot-password', [])) );
	}

	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => of(result);
	}

	private errorBlock(error) {
		if (false) { return throwError(error); } else { return undefined; }
	}

	editAccountData(payload: any, type: typeData): Observable<User> {
		return this.http.post<User>(API_USERS_URL + '/edit_account' , Object.assign({type}, payload))
			.pipe( catchError( error => this.errorBlock(error)) );
	}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(API_USERS_URL + '/login' , { email, password })
			.pipe( catchError( error => this.errorBlock(error)) );
    }

    getUserByToken(): Observable<User> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        return this.http.get<User>(API_USERS_URL + '/auth' , { headers: {'Authorization': userToken} })
			.pipe(
				map((res: User) => res),
				catchError( error => this.errorBlock(error))
			);
    }

    register(user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_USERS_URL + '/register', user, { headers: httpHeaders })
            .pipe(
                map((res: User) => res ),
				catchError( error => this.errorBlock(error))
			);
    }
}
