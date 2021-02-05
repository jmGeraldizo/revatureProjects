import {User} from './user/user';
import { TRForm } from './trForm/trform';

export enum TRActions {
    GetClaims = 'GET_CLAIMS',
    ChangeClaim = 'CHANGE_CLAIM'
}

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_USER',
    UpdateUser = 'UPDATE_USER'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}

export interface TRAction extends AppAction {
    type: TRActions;
    payload: TRForm | TRForm[];
}

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}

export function getClaims(claims: TRForm[]): TRAction {
    const action: TRAction = {
        type: TRActions.GetClaims,
        payload: claims
    }
    return action;
}

export function changeClaim(claim: TRForm): TRAction {
    const action: TRAction = {
        type: TRActions.ChangeClaim,
        payload: claim
    }
    return action;
} 

export function updateUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.UpdateUser,
        payload: user
    }
    return action;
}