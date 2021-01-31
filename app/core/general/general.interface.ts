import {
	IListContact,
	IListFolder,
	IListTest,
	IListTesting,
	IListVacancy,
	IPersonaResult,
	ITest,
	typeSection
} from '../_base/flex/models/interface';

export type typeStatus = 'demo' | 'paid';

export interface IGeneral {
	currentTestResult: IListTesting;
	listFolderVacancy: IListFolder[];
	demo: number;
	accountStatus: typeStatus;
	interviewBalance: number;
	testBalance: number;
	fullListVacancy: IListVacancy[];
	listTests: IListTest[];
	currentFolderID: string;
	currentFolder: IListFolder;
	currentListVacancy: IListVacancy[];
	currentVacancy: IListVacancy;
	deleteFolderWithVacancy: boolean;
	archiveListVacancy: IListVacancy[];
	section: typeSection;
	listTestings: IListTesting[];
	currentListTestings: IListTesting[];
	currentTest: ITest;
	personaResult: IPersonaResult;
	listContacts: IListContact[];
	currentContact: IListContact;
}


export interface IGetData {
	listTestings: IListTesting[];
	listContacts: IListContact[];
	listFolderVacancy: IListFolder[];
	demo: number;
	accountStatus: typeStatus;
	interviewBalance: number;
	testBalance: number;
	fullListVacancy: IListVacancy[];
	archiveListVacancy: IListVacancy[];
	folderID?: string;
}
