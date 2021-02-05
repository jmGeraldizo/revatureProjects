import {AppState} from './reducer';
import {AppAction, getClaims} from './actions';
import {ThunkAction} from 'redux-thunk';
import trService from './trForm/tr.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetClaims = (): AppThunk => async dispatch => {
    const asyncResp = await trService.getClaims();
    console.log('before thunk dispatch');
    dispatch(getClaims(asyncResp));
} 