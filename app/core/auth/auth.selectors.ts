import { createSelector } from '@ngrx/store';
import {User} from './user.model';

export const selectAuthState = state => state.auth;

export const Loading = createSelector( selectAuthState, auth => auth.loading );
export const LoadAccountEdit = createSelector( selectAuthState, auth => auth.loadAccountEdit );
export const ActiveAccount = createSelector( selectAuthState, auth => auth.active );
export const isLoggedIn = createSelector( selectAuthState, auth => auth.loggedIn );
export const isLoggedOut = createSelector( isLoggedIn, loggedIn => !loggedIn );
export const currentUser = createSelector(selectAuthState, (auth): User => auth.user);

export const isUserLoaded = createSelector(selectAuthState, auth => auth.isUserLoaded );
export const currentAuthToken = createSelector( selectAuthState, auth => auth.authToken );
export const currentUserRoleIds = createSelector(currentUser, user => user ? user.roles : [] );

export const ChangePassword = createSelector( selectAuthState, auth => auth.successChangePassword );
export const ChangeINFO = createSelector( selectAuthState, auth => auth.successChangeINFO );
export const ChangeINFOorg = createSelector( selectAuthState, auth => auth.successChangeINFOorg );
export const ChangeLOGO = createSelector( selectAuthState, auth => auth.successChangeLOGO );
