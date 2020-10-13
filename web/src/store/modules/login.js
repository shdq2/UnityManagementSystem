import {createAction,handleActions} from 'redux-actions';
import {Map} from 'immutable';
const LOGIN = 'login/LOGIN';
const CHANGE_ID = 'login/CHANGE_ID';
const CHANGE_PW = 'login/CHANGE_PW';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILED = 'login/LOGIN_FAILED';

export const login = createAction(LOGIN);
export const change_id = createAction(CHANGE_ID,id=>id);
export const change_pw = createAction(CHANGE_PW);
export const login_success  =createAction(LOGIN_SUCCESS);
export const login_failed  =createAction(LOGIN_FAILED);
const initialState = Map({
    id:"",
    pw:"",
    status:false
});

export default handleActions({
    [CHANGE_ID]:(state,{payload:id}) => state.set('id',id),
    [CHANGE_PW]:(state,action) => state.set('pw',action.payload),
    [LOGIN_SUCCESS]:(state,action) => state.set('status',true),
    [LOGIN_FAILED]:(state,action) => state.set('status',false),
    
},initialState);