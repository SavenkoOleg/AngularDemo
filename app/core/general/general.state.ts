import {IGeneral} from './general.interface';

export const initialGeneralState: IGeneral = {
	listFolderVacancy: [],
	demo: 6,
	accountStatus: 'demo',
	interviewBalance: 150,
	testBalance: 150,
	fullListVacancy: [],
	listTests: [
		{name: '"Интел"', type: 'intel', flag: true, id: 1},
		{name: '"Персона"', type: 'persona', flag:  true, id: 2},
		{name: 'Мастер-консультант', type: 'master_consultant', flag: true, id: 3},
		{name: 'Слесарь', type: 'locksmith', flag: true, id: 4},
		{name: 'Электрик', type: 'electrician', flag: true, id: 5},
		{name: '"Регард"', type: 'regard', flag: false, id: 6},
		{name: '"Видео"', type: 'video', flag: false, id: 7}
	],
	currentFolderID: '0',
	currentFolder: { name: 'Все разделы', folderID: '0', all: 0, unparsed: 0 },
	currentListVacancy: [],
	currentVacancy: undefined,
	deleteFolderWithVacancy: false,
	archiveListVacancy: [],
	section: 'all',
	listTestings: [],
	currentListTestings: [],
	currentTest: null,
	currentTestResult: null,
	personaResult: {
		status: {
			p1: 50,
			p2: 50,
			p3: 50,
			p4: 50,
			p5: 50,
			p6: 50,
			p7: 50,
			p8: 50,
			p9: 50,
			p10: 50,
			p11: 50,
			p12: 50
		}
	},
	listContacts: [],
	currentContact: null
};
