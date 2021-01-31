import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from './user.model';
import {copyState} from '../_base/utils/tools';

export interface AuthState {
    loggedIn: boolean;
    authToken: string;
    user: User;
    active: boolean;
    isUserLoaded: boolean;
    loading: boolean;
	loadAccountEdit: boolean;
	successChangePassword: number;
	successChangeINFO: boolean;
	successChangeINFOorg: boolean;
	successChangeLOGO: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: undefined,
    user: undefined,
	active: false,
    isUserLoaded: false,
	loading: false,
	loadAccountEdit: false,
	successChangePassword: 0,
	successChangeINFO: false,
	successChangeINFOorg: false,
	successChangeLOGO: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
		case AuthActionTypes.EditStatus: {

			let info = copyState(state.successChangeINFO);
			let infoOrg = copyState(state.successChangeINFOorg);
			let infoLogo = copyState(state.successChangeLOGO);
			let pass = copyState(state.successChangePassword);

			switch (action.params) {
				case 'successChangeINFO': {
					info = action.status;
					break;
				}
				case 'successChangeINFOorg': {
					infoOrg = action.status;
					break;
				}
				case 'successChangeLOGO': {
					infoLogo = action.status;
					break;
				}
				case 'successChangePassword': {
					pass = action.status;
					break;
				}
			}

			return {
				...state,
				successChangePassword: Number(pass),
				successChangeLOGO: Boolean(infoLogo),
				successChangeINFOorg: Boolean(infoOrg),
				successChangeINFO: Boolean(info)
			};
		}
		case AuthActionTypes.StatusLoadAccount: {
			return {
				...state,
				loadAccountEdit: action.load
			};
		}
		case AuthActionTypes.ToggleLoading: {
			return {
				...state,
				loading: action.payload,
			};
		}
		case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            return {
            	...state,
                loggedIn: true,
                authToken: _token
            };
        }
        case AuthActionTypes.Register: {
            const _token: string = action.payload.authToken;
            return {
				...state,
                loggedIn: true,
                authToken: _token
            };
        }
        case AuthActionTypes.Logout:
            return initialAuthState;
        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true,
				active: _user.active
            };
        }
		case AuthActionTypes.VerifySuccess: {
			return {
				...state,
				active: action.payload.status
			};
		}
		default:
            return state;
    }
}
