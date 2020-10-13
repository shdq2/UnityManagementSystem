import {createAction,handleActions} from 'redux-actions';
import {Map, List,fromJS} from 'immutable';

const SETUSERLIST = 'authority/SETUSERLIST';

export const setUserList = createAction(SETUSERLIST,list=>list);

const initialState = Map({
    userList:List()
    
});

export default handleActions({
    [SETUSERLIST]:(state,{payload:list}) => {
        return state.set('userList',fromJS(list));
    }
    
},initialState);