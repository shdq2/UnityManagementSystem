import {createAction,handleActions} from 'redux-actions';
import {Map, List,fromJS} from 'immutable';

const SETLOCATIONLIST = 'authority/SETLOCATIONLIST';
const SETMODALVIEW = 'authority/SETMODALVIEW';
const CHANGELOCATIONTITLE = 'authority/CHANGELOCATIONTITLE';
const CHANGELOCATIONADDR = 'authority/CHANGELOCATIONADDR';

export const setLocationList = createAction(SETLOCATIONLIST,list=>list);
export const setModalView = createAction(SETMODALVIEW);
export const changeLocationTitle = createAction(CHANGELOCATIONTITLE,title=>title);
export const changeLocationAddr = createAction(CHANGELOCATIONADDR,addr=>addr);

const initialState = Map({
    locationList:List(),
    modal:false,
    addr:'',
    title:''
});

export default handleActions({
    [SETLOCATIONLIST]:(state,{payload:list}) => {
        return state.set('locationList',fromJS(list));
    },
    [SETMODALVIEW]:(state,payload) => {        
        return state.set('modal',!state.get('modal'));
    },
    [CHANGELOCATIONADDR]:(state,{payload:addr}) => {       
        
        return state.set('addr',addr);
    },
    [CHANGELOCATIONTITLE]:(state,{payload:title}) => {        
        return state.set('title',title);
    }
},initialState);