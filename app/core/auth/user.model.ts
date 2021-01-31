export type typeData = 'info' | 'logo' | 'org';

export class User {
    userID: string;
    username: string;
    password: string;
    active: boolean;
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: number[];
    pic: string;
    first_name?: string;
    occupation: string;
	companyName: string;
	accountStatus: string;
	phone: string;
	accept: string;
	last_name: string;
	company_name: string;
	stuff_count: number;
	phone_number: string;
	active_link: number;
	typeOwnerships: number;
	legalName: string;
	legalAddress: string;
	factAddress: string;
	INN: string;
	KPP: string;
	genFIO: string;
	linkLOGO: string;
	linkREF: string;
	interviewBalance: number;
	testBalance: number;
}
