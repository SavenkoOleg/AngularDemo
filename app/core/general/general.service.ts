import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IGetData} from './general.interface';
import {catchError} from 'rxjs/operators';
import {IListFolder, IListVacancy, ISendResultTest, ISendTest, IStartTest} from '../_base/flex/models/interface';

const enum API_URL {
	GET_DATA = 'api/general/all_data',
	VACANCY_ADD = 'api/general/add_vacancy',
	VACANCY_EDIT = 'api/general/edit_vacancy',
	VACANCY_DEL = 'api/general/del_vacancy',
	VACANCY_ARCH = 'api/general/arch_vacancy',
	VACANCY_UnARCH = 'api/general/un_arch_vacancy',
	FOLDER_ADD = 'api/general/add_folder',
	FOLDER_DEL = 'api/general/del_folder',
	SEND_TEST = 'api/general/send_test',
	START_TEST = 'api/general/start_test',
	SEND_RESULT = 'api/general/send_result',
	GET_ANKET = 'api/general/get_anket',
	GET_TEST = 'api/general/get_test',
	SOME_TESTING_DEL = 'api/general/del_some_testing'
}

@Injectable()
export class GeneralService {
    constructor( private http: HttpClient) {}

	errorBlock(error) {
		if (false) { return throwError(error); } else { return undefined; }
	}

	getTest(testID: string): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
    	return this.http.post(API_URL.GET_TEST, {testID}, { headers: httpHeaders})
			.pipe( catchError( error => this.errorBlock(error)) );
	}

	getAnket(testID: string): Observable<any> {
		return this.http.post(API_URL.GET_ANKET, { testID })
			.pipe( catchError( error => this.errorBlock(error)) );
	}

    sendResult(payload: ISendResultTest): Observable<any> {
		return this.http.post(API_URL.SEND_RESULT, { payload })
			.pipe( catchError( error => this.errorBlock(error)) );
	}

    startTest(payload: IStartTest): Observable<any> {
    	return this.http.post(API_URL.START_TEST, { payload })
			.pipe( catchError( error => this.errorBlock(error)) );
	}

	getAllData(): Observable<IGetData> {
		return this.http.get<IGetData>(API_URL.GET_DATA)
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	addVacancy( vacancy: IListVacancy ): Observable<IGetData> {
    	return this.http.post<IGetData>(API_URL.VACANCY_ADD, vacancy)
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	editVacancy( vacancy: IListVacancy ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.VACANCY_EDIT, vacancy)
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	deleteSomeResultTest( list: string[] ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.SOME_TESTING_DEL, { list })
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	deleteVacancy( vacancyID: string ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.VACANCY_DEL, { vacancyID })
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	addArchiveVacancy( vacancyID: string ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.VACANCY_ARCH, { vacancyID })
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	unArchiveVacancy( vacancyID: string ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.VACANCY_UnARCH, { vacancyID })
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	addFolder( folder: IListFolder ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.FOLDER_ADD, folder)
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	deleteFolder( folderID: string ): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.FOLDER_DEL, { folderID })
			.pipe( catchError( error => this.errorBlock(error)) );
	};
	sendTest(send: ISendTest): Observable<IGetData> {
		return this.http.post<IGetData>(API_URL.SEND_TEST, {send})
			.pipe( catchError( error => this.errorBlock(error)) );
	}
}
