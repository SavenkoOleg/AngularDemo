import {IGeneral} from './general.interface';
import {initialGeneralState} from './general.state';
import {EGeneralActions, GeneralActions} from './general.actions';
import {copyState} from '../_base/utils/tools';
import {IListContact, IListFolder, IListTesting, IListVacancy, ITest} from '../_base/flex/models/interface';

export function generalReducers(
	state: IGeneral = initialGeneralState,
	action: GeneralActions
): IGeneral {

	let currentListVacancy: IListVacancy[] = copyState(state.fullListVacancy);
	let fullListVacancy: IListVacancy[] = copyState(state.fullListVacancy);
	let currentFolder: IListFolder = copyState(state.currentFolder);
	let listFolderVacancy: IListFolder[] = copyState(state.listFolderVacancy);
	let listContacts: IListContact[] = copyState(state.listContacts);
	let listTestings: IListTesting[] = copyState(state.listTestings);

	switch (action.type) {
		case EGeneralActions.SearchTesting: {
			let sortListTesting: IListTesting[] = copyState<IListTesting[]>(state.currentListTestings);
			return {
				...state,
				currentListTestings: sortListTesting.filter(item => {
					if (item.last_name) { return item.last_name.toLowerCase().indexOf(action.input.toLowerCase()) !== -1;
					} else { return false; }
				} )
			};
		}
		case EGeneralActions.SetCurrentTestResult: {
			return {
				...state,
				currentTestResult: state.currentListTestings.find(item => item.testingID === action.testingID)
			};
		}
		case EGeneralActions.SetPersonaResult: {
			return {
				...state,
				personaResult: action.result
			};
		}
		case EGeneralActions.GetTestSuccess: {
			return {
				...state,
				currentTest: action.test
			};
		}
		case EGeneralActions.GetAnketOk: {
			return state;
		}
		case EGeneralActions.LoadAllData: {
			fullListVacancy = action.payload.fullListVacancy;
			currentListVacancy = fullListVacancy;

			let currentVacancy: IListVacancy = null;

			let all: number = currentListVacancy ? currentListVacancy.length : 0;
			let unparsed: number = currentListVacancy ? currentListVacancy.filter(item => item.section === 'unparsed').length : 0;

			if (state.currentFolderID !== '0') {
				currentListVacancy = fullListVacancy.filter(item => item.folderID === state.currentFolderID);
				if (state.section === 'demo' || 'unparsed') { currentListVacancy = currentListVacancy.filter(item => item.section === state.section); }
				all = currentListVacancy.length;
				unparsed = currentListVacancy.filter(item => item.section === 'unparsed').length;
			}

			let nameFolder: string = state.currentFolder.name;
			let folderID: string = state.currentFolderID;

			if (action.payload.folderID) {
				folderID = action.payload.folderID;

				if (listFolderVacancy.length) { nameFolder = listFolderVacancy.find(item => item.folderID === folderID).name;
				} else { nameFolder = 'Все разделы'; }
			}

			currentFolder = { name: nameFolder, folderID, all, unparsed};
			let currentListTestings: IListTesting[] = [];

			if (action.payload.fullListVacancy && action.payload.fullListVacancy.length) {
				currentListTestings = state.listTestings.filter(item => item.vacancyID === action.payload.fullListVacancy[0].vacancyID);
				currentVacancy = action.payload.fullListVacancy[0];
			}

			let sortListTesting: IListTesting[] = copyState<IListTesting[]>(action.payload.listTestings);
			sortListTesting.sort((a, b) => a.sendDate < b.sendDate ? 1 : -1);

			return {
				...state,
				listFolderVacancy: action.payload.listFolderVacancy,
				demo: action.payload.demo,
				accountStatus: action.payload.accountStatus,
				interviewBalance: action.payload.interviewBalance,
				testBalance: action.payload.testBalance,
				fullListVacancy,
				archiveListVacancy: action.payload.archiveListVacancy,
				currentVacancy,
				currentListVacancy,
				currentFolder,
				listContacts: action.payload.listContacts,
				listTestings: action.payload.listTestings,
				currentListTestings: sortListTesting,
			};
		}
		case EGeneralActions.SearchContact: {
			return {
				...state,
				currentContact: listContacts.find(item => item.email === action.email)
			};
		}
		case EGeneralActions.SearchVacancy: {
			return {
				...state,
				currentListVacancy: currentListVacancy.filter(item => item.name.toLowerCase().indexOf(action.input.toLowerCase()) !== -1)
			};
		}
		case EGeneralActions.OpenSection: {
			if ( action.section !== 'all' ) { currentListVacancy = currentListVacancy.filter(item => item.section === action.section); }
			if ( state.currentFolderID !== '0' ) { currentListVacancy = currentListVacancy.filter(item => item.folderID === state.currentFolderID); }

			return {
				...state,
				currentListVacancy,
				section: action.section
			};
		}
		case EGeneralActions.ResetCheckFolder: {
			return {
				...state,
				deleteFolderWithVacancy: false
			};
		}
		case EGeneralActions.CheckFolder: {
			let deleteFolderWithVacancy: boolean = false;
			fullListVacancy.map(item => { if (item.folderID === action.foldID) deleteFolderWithVacancy = true;  });

			return {
				...state,
				deleteFolderWithVacancy
			};
		}
		case EGeneralActions.OpenVacancy: {
			let currentVacancy = fullListVacancy.find(v => v.vacancyID === action.vacancyID);
			let currentListTestings: IListTesting[] = listTestings.filter(v => v.vacancyID === action.vacancyID);
			return {
				...state,
				currentVacancy,
				currentListTestings
			};
		}
		case EGeneralActions.NewVacancy: {
			fullListVacancy.push(action.vacancy);

			return {
				...state,
				fullListVacancy
			};
		}
		case EGeneralActions.OpenFolder: {
			currentFolder = listFolderVacancy.find(item => item.folderID === action.foldID);

			if (action.foldID !== '0') { currentListVacancy = fullListVacancy.filter(item => item.folderID === action.foldID);
			} else { currentListVacancy = fullListVacancy; }

			let all: number = currentListVacancy.length;
			let unparsed: number = 0;

			currentListVacancy.map(item => { if (item.section === 'unparsed') unparsed++ ; });

			if (currentFolder) { currentFolder = { name: currentFolder.name, folderID: currentFolder.folderID, all, unparsed};
			} else { currentFolder = { name: 'Все разделы', folderID: '0', all, unparsed }; }

			return {
				...state,
				currentFolderID: action.foldID,
				currentFolder,
				currentListVacancy
			};
		}
		case EGeneralActions.SetListFolder: {
			return state;
		}
		case EGeneralActions.DeleteFolder: {
			return {
				...state,
				listFolderVacancy: listFolderVacancy.filter(item => item.folderID !== action.folderID),
				currentFolderID: fullListVacancy.length ? fullListVacancy[0].folderID : null
			};
		}
		default: {
			return state;
		}
	}
}
