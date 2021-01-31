import { Action } from '@ngrx/store';
import {typeData, User} from './user.model';
import {IChangePassword, typeStatus} from '../_base/flex/models/interface';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API',
	ToggleLoading = '[Register] Toggle Loading',
	VerifySuccess = '[Verify] Verify Success',
	EditAccountData = '[EditAccount] Edit Account Data',
	StatusLoadAccount = '[EditAccount] Status Load Account',
	EditPassword = '[Edit Account] Edit Password',
	EditStatus = '[Edit Account] Edit Status'
}

export class EditStatus {
	public readonly type = AuthActionTypes.EditStatus;
	constructor(public status: boolean | number, public params: typeStatus){}
}
export class EditPassword {
	public readonly type = AuthActionTypes.EditPassword;
	constructor(public pass: IChangePassword) {}
}
export class StatusLoadAccount implements Action {
	public readonly type = AuthActionTypes.StatusLoadAccount;
	constructor(public load: boolean) {}
}
export class EditAccountData implements Action {
	public readonly type = AuthActionTypes.EditAccountData;
	constructor(public payload: any, public typeData: typeData) {}
}
export class VerifySuccess implements Action {
	public readonly type = AuthActionTypes.VerifySuccess;
	constructor(public payload: any) {}
}
export class ToggleLoading implements Action {
	public readonly type = AuthActionTypes.ToggleLoading;
	constructor(public payload: boolean) {}
}
export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authToken: string }) { }
}
export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}
export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { authToken: string }) { }
}
export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
}
export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: User }) { }
}

export type AuthActions = Login |
	Logout |
	Register |
	UserRequested |
	UserLoaded |
	ToggleLoading |
	VerifySuccess |
	EditAccountData |
	StatusLoadAccount |
	EditPassword |
	EditStatus;
