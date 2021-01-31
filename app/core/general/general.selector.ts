import {IAppState} from '../app.state';
import {IGeneral, typeStatus} from './general.interface';
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
import {createSelector} from '@ngrx/store';

const selectGeneral = (state: IAppState): IGeneral => state.general;
export const selectApp = (state: IAppState): any => state.router;

export const selectListFolderVacancy = createSelector(selectGeneral, (state: IGeneral): IListFolder[] => state.listFolderVacancy);
export const selectCountDemo = createSelector(selectGeneral, (state: IGeneral): number => state.demo);
export const selectAccountStatus = createSelector(selectGeneral, (state: IGeneral): typeStatus => state.accountStatus);
export const selectInterviewBalance = createSelector(selectGeneral, (state: IGeneral): number => state.interviewBalance);
export const selectTestBalance = createSelector(selectGeneral, (state: IGeneral): number => state.testBalance);
export const selectFullListVacancy = createSelector(selectGeneral, (state: IGeneral): IListVacancy[] => state.fullListVacancy);
export const selectListTests = createSelector(selectGeneral, (state: IGeneral): IListTest[] => state.listTests);
export const selectListContacts = createSelector(selectGeneral, (state: IGeneral): IListContact[] => state.listContacts);
export const selectContact = createSelector(selectGeneral, (state: IGeneral): IListContact => state.currentContact);
export const selectCurrentFolderID = createSelector(selectGeneral, (state: IGeneral): string => state.currentFolderID);
export const selectCurrentFolder = createSelector(selectGeneral, (state: IGeneral): IListFolder => state.currentFolder);
export const selectCurrentVacancy = createSelector(selectGeneral, (state: IGeneral): IListVacancy => state.currentVacancy);
export const selectCurrentListVacancy = createSelector(selectGeneral, (state: IGeneral): IListVacancy[]  => state.currentListVacancy);
export const selectArchiveListVacancy = createSelector(selectGeneral, (state: IGeneral): IListVacancy[]  => state.archiveListVacancy);
export const selectDeleteFolderWithVacancy = createSelector(selectGeneral, (state: IGeneral): boolean  => state.deleteFolderWithVacancy);
export const selectSection = createSelector(selectGeneral, (state: IGeneral): typeSection  => state.section);
export const selectCurrentListTestings = createSelector(selectGeneral, (state: IGeneral): IListTesting[]  => state.currentListTestings);
export const selectCurrentTest = createSelector(selectGeneral, (state: IGeneral): ITest => state.currentTest);
export const selectPersonaResult = createSelector(selectGeneral, (state: IGeneral): IPersonaResult => state.personaResult);
export const selectCurrentTestResult = createSelector(selectGeneral, (state: IGeneral): IListTesting => state.currentTestResult);
