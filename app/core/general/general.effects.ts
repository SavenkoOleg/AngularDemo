import { Injectable } from '@angular/core';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	AddFolder,
	AddVacancy,
	EditVacancy,
	ArchiveVacancy,
	DeleteFolder, DeleteSomeResultTest,
	DeleteVacancy,
	EGeneralActions,
	GetAllData,
	GetAnket, GetAnketOk, GetTest, GetTestSuccess,
	LoadAllData,
	SendResult,
	SendTest,
	StartTest,
	UnArchiveVacancy
} from './general.actions';
import { GeneralService } from './general.service';
import {IAppState} from '../app.state';


@Injectable()
export class GeneralEffects {

	constructor(private actions$: Actions,
				private general: GeneralService,
				private _store: Store<IAppState>) { }

	handleError(error) {
		let errorMessage: string = '';
		if (error.error instanceof ErrorEvent) { errorMessage = `Error: ${error.error.message}`; }
		else { errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; }
		return throwError(errorMessage);
	}

	@Effect({dispatch: false})
	deleteSomeTestResult$ = this.actions$.pipe(
		ofType<DeleteSomeResultTest>(EGeneralActions.DeleteSomeResultTest),
		switchMap(action => this.general.deleteSomeResultTest(action.list)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	getTest$ = this.actions$.pipe(
		ofType<GetTest>(EGeneralActions.GetTest),
		switchMap(action => this.general.getTest(action.testID)),
		tap(data => this._store.dispatch(new GetTestSuccess(data))),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	getAnket$ = this.actions$.pipe(
		ofType<GetAnket>(EGeneralActions.GetAnket),
		switchMap(action => this.general.getAnket(action.testID)),
		tap( data => this._store.dispatch(new GetAnketOk(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	sendResult$ = this.actions$.pipe(
		ofType<SendResult>(EGeneralActions.SendResult),
		switchMap(action => this.general.sendResult(action.payload)),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	startTest$ = this.actions$.pipe(
		ofType<StartTest>(EGeneralActions.StartTest),
		switchMap(action => this.general.startTest(action.payload)),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	getData$ = this.actions$.pipe(
		ofType<GetAllData>(EGeneralActions.GetAllData),
		switchMap((action) => this.general.getAllData() ),
		tap(data => this._store.dispatch(new LoadAllData(data))),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	addFolder$ = this.actions$.pipe(
		ofType<AddFolder>(EGeneralActions.AddFolder),
		switchMap((action) => this.general.addFolder(action.folder)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	delFolder$ = this.actions$.pipe(
		ofType<DeleteFolder>(EGeneralActions.DeleteFolder),
		switchMap((action) => this.general.deleteFolder(action.folderID)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	addVacancy$ = this.actions$.pipe(
		ofType<AddVacancy>(EGeneralActions.AddVacancy),
		switchMap((action) => this.general.addVacancy(action.vacancy)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	editVacancy$ = this.actions$.pipe(
		ofType<EditVacancy>(EGeneralActions.EditVacancy),
		switchMap((action) => this.general.editVacancy(action.vacancy)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	delVacancy$ = this.actions$.pipe(
		ofType<DeleteVacancy>(EGeneralActions.DeleteVacancy),
		switchMap((action) => this.general.deleteVacancy(action.vacancyID)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	archiveVacancy$ = this.actions$.pipe(
		ofType<ArchiveVacancy>(EGeneralActions.ArchiveVacancy),
		switchMap((action) => this.general.addArchiveVacancy(action.vacancyID)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	unArchiveVacancy$ = this.actions$.pipe(
		ofType<UnArchiveVacancy>(EGeneralActions.UnArchiveVacancy),
		switchMap((action) => this.general.unArchiveVacancy(action.vacancyID)),
		tap( data => this._store.dispatch(new LoadAllData(data)) ),
		catchError(this.handleError)
	);

	@Effect({dispatch: false})
	sendTest$ = this.actions$.pipe(
		ofType<SendTest>(EGeneralActions.SendTest),
		switchMap((action) => this.general.sendTest(action.payload)),
		catchError(this.handleError)
	);

}
