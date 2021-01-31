export type typeIMG = 'img' | 'not_img';
export type stepRecriut = 'test' | 'interview';
export type typeTest = 'result' | 'tools' | 'intel' | 'sales' | 'regard' | 'video' | 'persona' | 'electrician' | 'master_consultant' | 'locksmith';
export type typeQ = 'var' | 'input';
export type typeStatus = 'successChangePassword' | 'successChangeINFO' | 'successChangeINFOorg' | 'successChangeLOGO';
export type typeSection = 'all' | 'demo' | 'unparsed';

export interface IInterview {
	vacancyInfo: IFormVacancyInfo;
	candidateInfo: IFormCandidateInfo;
	interviewInfo: IFormInterviewInfo;
	caseInfo: IFormCaseInfo;
	qualificationInfo: IFromQualificationInfo;
	generalBlockInfo: IFormGeneralBlockInfo;
};

export interface IFormVacancyInfo {
	name: string;
	place: string;
	schedule: string;
	salary: string;
	middle_salary: string;
	schemeMotivation: string;
	product: string;
	motivationForProbation: string;
	additionally: string;
}

export interface IFormCandidateInfo {
	FIO: string;
	email: string;
	phone: string;
	age: string;
	city: string;
	experience: boolean;
	experienceForVacancy: boolean;
	zoom: string;
}

export interface IFormInterviewInfo {
	text: string;
	p1: number;
	p2: number;
	p3: number;
	p4: number;
}

export interface IFormCaseInfo {
	cases: number;
	casesType: number;
	p1: number;
	p2: number;
	p3: number;
	p4: number;
	p5: number;
	p6: number;
	p7: number;
	p8: number;
	p9: number;
	p10: number;
	p11: number;
	p12: number;
	p13: number;
	caseAverage: number;
}

export interface IFromQualificationInfo {
	productCompany: string;
	experience: string;
	subordinates: string;
	mentor: string;
	productOfActivity: string;
	functions: string;
}

export interface IFormGeneralBlockInfo {
	p1: number;
	p2: number;
	p3: number;
	p4: number;
	p5: number;
	p6: number;
	p7: number;
	p8: number;
	p9: number;
	p10: number;
	p11: number;
	p12: number;
	p13: number;
	p14: number;
	p15: number;
}

export interface IPersonaResult {
	status: {
		p1: number;
		p2: number;
		p3: number;
		p4: number;
		p5: number;
		p6: number;
		p7: number;
		p8: number;
		p9: number;
		p10: number;
		p11: number;
		p12: number;
	};
}

export interface IListTesting {
	testingID: string;
	vacancyID: string;
	userID: string;
	typeTest: typeTest;
	email: string;
	status: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	age: string;
	male: string;
	result: {
		IQ:  number;
		result:  number;
		skips: number;
		minutes: number;
		seconds: number;
	};
	link: string;
	sendDate: string;
}

export interface IAnket {
	first_name: string;
	last_name: string;
	age: number;
	phone_number: string;
	city: string;
	name: string;
	check_1: boolean;
	check_2: boolean;
	male: number;
	test: number;
}

export interface IStartTest {
	userID: string;
	testID: string;
	anket: IAnket;
}

export interface ISendResultTest {
	IQ?: number;
	result: any;
	skips: number;
	minutes: number;
	seconds: number;
	allResult: IAnswerRes[];
	testID: string;
}

export interface ISendTest {
	typeTest: typeTest;
	email: string;
	vacancyID: string;
	userID: string;
	testingID: string;
}

export interface IChangePassword {
	currentPassword: string;
	newPassword: string;
	verifyPassword: string;
}

export interface IListFolder {
	name: string;
	folderID: string;
	all: number;
	unparsed: number;
}

export interface ICase {
	name: string;
	caseTypeID: number;
	id: number;
	type: string;
	situation: string;
	task: string;
	result: string[];
	assessment: number[];
}

export interface IAssessmentPosition {
	id: number;
	criterion: string;
	left: string;
	right: string;
}

export interface IListContact {
	contactID: string;
	userID: string;
	first_name: string;
	last_name: string;
	email: string;
	age: number;
	phone_number: string;
	city: string;
	name: string;
	check_1: boolean;
	check_2: boolean;
	male: number;
	test: number;
}

export interface IList {
	name: string;
	id: string;
}

export interface IListTest {
	name: string;
	type: typeTest;
	flag: boolean;
	id: number;
}

export interface IListVacancy {
	name: string;
	vacancyID?: string;
	folderID?: string;
	type: IList;
	section?: typeSection;
	space?: string;
	product?: string;
	duties?: string;
	amount?: string;
}

export interface IAnswer {
	id: string | number;
	text: string;
	type: typeIMG;
	url: string;
}

export interface IQuestion {
	id: string;
	type: typeIMG;
	typeQ: typeQ;
	right: string | number | number[];
	text: string;
	url: string;
	ans: boolean;
	skip: boolean;
	answer: IAnswer[];
}

interface ITimer {
	flag: boolean;
	seconds: number;
	minutes: number;
}

export type TFactors = 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H' | 'I' | 'L' | 'M' | 'N' | 'O' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface ITableForPersona {
	questID: number;
	answers: number[];
	factor: TFactors;
}

export interface ITestNotAvailabel {
	status: string;
	description: string;
}

export interface ITest {
	testID: string;
	name: string;
	type: string;
	timer: ITimer;
	status: string;
	skip: boolean;
	content: IQuestion[];
}

export interface IAnswerRes {
	questID: number;
	answerID?: string | number[];
	answerTXT?: string;
	typeQ: typeQ;
	success: boolean;
	right: string | number | number[];
	m: number;
	s: number;
}

export interface IConvertToStens {
	age: [number, number];
	A: [number, number][];
	B: [number, number][];
	C: [number, number][];
	E: [number, number][];
	F: [number, number][];
	G: [number, number][];
	H: [number, number][];
	I: [number, number][];
	L: [number, number][];
	M: [number, number][];
	N: [number, number][];
	O: [number, number][];
	Q1: [number, number][];
	Q2: [number, number][];
	Q3: [number, number][];
	Q4: [number, number][];
}

