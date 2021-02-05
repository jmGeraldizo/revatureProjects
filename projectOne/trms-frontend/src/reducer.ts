import * as Actions from './actions';
import { TRForm } from './trForm/trform';
import { User } from './user/user';

export interface UserState {
    user: User;
    loginUser: User;
}

export interface TRState {
    claims: TRForm[];
    claim: TRForm;
}

export interface AppState extends UserState, TRState { }

const initialState: AppState = {
    user: new User(),
    loginUser: new User(),
    claims: [],
    claim: new TRForm()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    //console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.TRActions.GetClaims:
            newState.claims = action.payload as TRForm[];
            return newState;
        case Actions.TRActions.ChangeClaim:
            newState.claim = action.payload as TRForm;
            return newState;
        case Actions.UserActions.UpdateUser:
            newState.user = action.payload as User;
            return newState;
        default: 
            return state;
    }
}

export default reducer;