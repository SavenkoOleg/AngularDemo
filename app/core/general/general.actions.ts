import {Action} from '@ngrx/store';
import {
	IListFolder,
	IListVacancy,
	IPersonaResult,
	ISendResultTest,
	ISendTest,
	IStartTest,
	ITest,
	typeSection
} from '../_base/flex/models/interface';
import {IGetData} from './general.interface';

export enum EGeneralActions {
	SetListFolder = '[General] Set List Folder',
	OpenFolder = '[General] Opne Folder',
	NewVacancy = '[General] New Vacancy',
	OpenVacancy = '[General] Open Vacancy',
	CheckFolder = '[General] Check Folder',
	ResetCheckFolder = '[General] Reset Check Folder',
	OpenSection = '[General] open Section',
	SearchVacancy = '[General] Search Vacancy',
	SearchTesting = '[General] Search Testing',
	GetAllData = '[General] Get All Data',
	LoadAllData = '[General] load All Data',
	AddVacancy = '[General] Add Vacancy',
	EditVacancy = '[General] Edit Vacancy',
	DeleteVacancy = '[General] Delete Vacancy',
	ArchiveVacancy = '[General] Archive Vacancy',
	UnArchiveVacancy = '[General] Un Archive Vacancy',
	AddFolder = '[General] Add Folder',
	DeleteFolder = '[General] Delete Fodler',
	SendTest = '[General] Send Test',
	StartTest = '[Test] Start Test',
	SendResult = '[Test] Send Result',
	GetAnket = '[Test] Get Anket',
	GetAnketOk = '[Test] Get Anket Ok',
	GetTest = '[Test] Get Test',
	GetTestSuccess = '[Test] Get Test Success',
	SetPersonaResult = '[Test] Set Persona Result',
	SetCurrentTestResult = '[Test] Set Current Test Result',
	DeleteSomeResultTest = '[Test] Delete Some Result Test',
	SearchContact = '[General] Search Contact'
}

export class SearchContact implements Action {
	public readonly type = EGeneralActions.SearchContact;
	constructor(public email: string) {}
}

export class DeleteSomeResultTest implements Action {
	public readonly type = EGeneralActions.DeleteSomeResultTest;
	constructor(public list: string[]) {}
}

export class SearchTesting implements Action {
	public readonly type = EGeneralActions.SearchTesting;
	constructor(public input: string) {}
}

export class SetCurrentTestResult implements Action {
	public readonly type = EGeneralActions.SetCurrentTestResult ;
	constructor(public testingID: string) {}
}

export class SetPersonaResult implements Action {
	public readonly type = EGeneralActions.SetPersonaResult;
	constructor(public result: IPersonaResult) {}
}

export class GetTestSuccess implements Action {
	public readonly type = EGeneralActions.GetTestSuccess;
	constructor(public test: ITest) {}
}

export class GetTest implements Action {
	public readonly type = EGeneralActions.GetTest;
	constructor(public testID: string) {}
}

export class GetAnketOk implements Action {
	public readonly type = EGeneralActions.GetAnketOk;
	constructor(public anket: any) {}
}

export class GetAnket implements Action {
	public readonly type = EGeneralActions.GetAnket;
	constructor(public testID: string) {}
}

export class SendResult implements Action {
	public readonly type = EGeneralActions.SendResult;
	constructor(public payload: ISendResultTest) {}
}

export class StartTest implements Action {
	public readonly type = EGeneralActions.StartTest;
	constructor(public payload: IStartTest) {}
}

export class SendTest implements Action {
	public readonly type = EGeneralActions.SendTest;
	constructor(public payload: ISendTest) {}
}

export class DeleteVacancy implements Action {
	public readonly type = EGeneralActions.DeleteVacancy;
	constructor(public vacancyID: string) {}
}

export class EditVacancy implements Action {
	public readonly type = EGeneralActions.EditVacancy;
	constructor(public vacancy: IListVacancy) {}
}

export class AddVacancy implements Action {
	public readonly type = EGeneralActions.AddVacancy;
	constructor(public vacancy: IListVacancy) {}
}

export class AddFolder implements Action {
	public readonly type = EGeneralActions.AddFolder;
	constructor(public folder: IListFolder) {}
}

export class LoadAllData implements Action {
	public readonly type = EGeneralActions.LoadAllData;
	constructor(public payload: IGetData) {}
}

export class GetAllData implements Action {
	public readonly type = EGeneralActions.GetAllData;
	constructor() {}
}

export class SearchVacancy implements Action {
	public readonly type = EGeneralActions.SearchVacancy;
	constructor(public input: string) {}
}

export class OpenSection implements Action {
	public readonly type = EGeneralActions.OpenSection;
	constructor(public section: typeSection) {}
}

export class UnArchiveVacancy implements Action {
	public readonly type = EGeneralActions.UnArchiveVacancy;
	constructor(public vacancyID: string) {}
}

export class ResetCheckFolder implements Action {
	public readonly type = EGeneralActions.ResetCheckFolder;
	constructor() {}
}

export class CheckFolder implements Action {
	public readonly type = EGeneralActions.CheckFolder;
	constructor(public foldID: string) {}
}

export class OpenVacancy implements Action {
	public readonly type = EGeneralActions.OpenVacancy;
	constructor(public vacancyID: string) {}
}

export class NewVacancy implements Action {
	public readonly type = EGeneralActions.NewVacancy;
	constructor(public vacancy: IListVacancy) {}
}

export class ArchiveVacancy implements Action {
	public readonly type = EGeneralActions.ArchiveVacancy;
	constructor(public vacancyID: string) {}
}

export class SetListFolder implements Action {
	public readonly type = EGeneralActions.SetListFolder;
	constructor(public payload: any) {}
}

export class DeleteFolder implements Action {
	public readonly type = EGeneralActions.DeleteFolder;
	constructor(public folderID: string) {}
}

export class OpenFolder implements Action {
	public readonly type = EGeneralActions.OpenFolder;
	constructor(public foldID: string) {}
}

export type GeneralActions = SetListFolder |
	DeleteFolder |
	OpenFolder |
	ArchiveVacancy |
	NewVacancy |
	OpenVacancy |
	CheckFolder |
	ResetCheckFolder |
	UnArchiveVacancy |
	OpenSection |
	SearchVacancy |
	GetAllData |
	LoadAllData |
	AddVacancy |
	DeleteVacancy |
	SendTest |
	StartTest |
	SendResult |
	GetAnket |
	GetAnketOk |
	GetTest |
	GetTestSuccess |
	SetPersonaResult |
	SetCurrentTestResult |
	SearchTesting |
	DeleteSomeResultTest |
	EditVacancy |
	SearchContact;
