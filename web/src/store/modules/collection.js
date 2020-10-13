import {createAction,handleActions} from 'redux-actions';
import {Map, List,fromJS} from 'immutable';

const SETLIST = 'collection/SETLIST';
const SETMODAL = 'collection/SETMODAL';
const CHANGECOLLECTIONAME = 'collection/CHANGECOLLECTIONAME';
export const setList = createAction(SETLIST,list=>list);
export const setModal = createAction(SETMODAL);
export const changeName = createAction(CHANGECOLLECTIONAME);

const initialState = Map({
    collections:List(),
    isModalOpen:false,
    collectionName:''
});

export default handleActions({
    
    [SETLIST]:(state,{payload:item}) => {      
        return state.set('collections',fromJS(item));
    },

    [SETMODAL]:(state,payload) => {        
        return state.set('isModalOpen',!state.get('isModalOpen'));
    },

    [CHANGECOLLECTIONAME]:(state,payload) =>{
        
        return state.set('collectionName',payload.payload);
    }
},initialState);