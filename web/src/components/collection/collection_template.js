import React, { Component, Fragment } from 'react';
import './collection_template.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as collectionActions from '../../store/modules/collection';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import { fromJS } from 'immutable';
import CollectionItem from './collection_item';
import Modal from './Modal';
import * as uuid from 'uuid';

class Collection_template extends Component {    
    constructor(props){
        super(props);
        const {LoadCollectionList} = this;
        LoadCollectionList();
    }
    LoadCollectionList = () => {        
        const {CollectionActions,collections} = this.props;             
        //CollectionActions.setList(['1','2']);
        axios.get('http://localhost:4000/collection/getList').then(response =>{                
            CollectionActions.setList(response.data.result);     
        })
    }
    
    handleModalOnOff = ()=>{
        const {CollectionActions} = this.props;     
        CollectionActions.setModal();
    }

    handleChangeName = (e)=>{
        const {CollectionActions} = this.props;    
        CollectionActions.changeName(e.target.value);        
    }

    handleCreateCollection = () =>{
        const {CollectionActions,cookies,collectionName} = this.props;     
        const {LoadCollectionList} = this;
        const id = uuid.v4().replace(/-/gi,'');
        const newDate = new Date();
        const now = newDate.getFullYear() + "/" + (newDate.getMonth()+1) + "/"+newDate.getDate()+" "+ newDate.getHours()+ ":"+newDate.getMinutes()+":"+newDate.getSeconds();
                
        const sendData = {
            id:id,
            name:collectionName,
            date:now,
            user_id:cookies.get('user_info')
        };

        axios.post('http://localhost:4000/collection/createcollection',sendData).then(res =>{            
            if(res.status == 200){
                LoadCollectionList();
                CollectionActions.setModal();
            }
        })
    }
    render(){                
        const {collections,isOpen} = this.props;
        const {handleModalOnOff,handleChangeName,handleCreateCollection} = this;
        const mapToComponent = data => {    
            return data.map((person, i) => {                
              return (<CollectionItem data={person} key={i}  />);
            });
          };               
        return (
            <Fragment>
                <Modal isOpen={isOpen} close={handleModalOnOff} change={handleChangeName} craete={handleCreateCollection}></Modal>    
                <div className="collection_Container">
                
                    <div className="collection_Container_topbar">
                        <input type="button" value="Create Collection" onClick={handleModalOnOff} />
                    </div>
                    <div className="collection_Container_body">
                        {mapToComponent(collections)}       
                        
                    </div>
                
                </div>
            </Fragment>
        )
    }

    componentDidMount(prevProps,prevState){
        const {cookies} = this.props;        
        if(cookies.get('user_info') != "undefined" && cookies.get('user_info') != null ){            
            cookies.set('current_page','');
        }
        return false;
    }
    
}

export default connect(
    ({collection}) => ({
        collections:collection.get('collections'),
        isOpen:collection.get('isModalOpen'),
        collectionName:collection.get('collectionName')
    }),
    (dispatch) =>({
        CollectionActions : bindActionCreators(collectionActions,dispatch)
    })
)(withCookies(Collection_template));
