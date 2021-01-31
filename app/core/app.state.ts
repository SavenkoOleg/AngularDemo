import { RouterReducerState } from '@ngrx/router-store';
import { IGeneral } from './general/general.interface';
import { IEducation } from './education/education.model';
import {IAdminPanel} from './admin_panel/admin_panel.model';
import { initialGeneralState } from './general/general.state';
import { initialEducationState } from './education/education.state';
import { initialAdminPanelState } from './admin_panel/admin_panel.state';

export interface IAppState {
	router?: RouterReducerState;
	general: IGeneral;
	admin: IAdminPanel;
	education: IEducation;
};

export const initialAppState: IAppState = {
	general: initialGeneralState,
	education: initialEducationState,
	admin: initialAdminPanelState
};

export function getInitialAppState(): IAppState {
	return initialAppState;
};

