import React, { Component } from 'react';
import './collection_detail_topbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as collectionActions from '../../store/modules/collection';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';


class Collection_detail_list extends Component{
    constructor(props){
        super(props);
        const {getCollectionItemList} = this;
        
        getCollectionItemList(this.props.id);
    }
    state = {
        List:[]
    }

    getCollectionItemList = (params) =>{
        console.log(params);
    }

    render(){        
        return (        
            <div className="collection_detail_list">
                <input type="button" className="btn top-btn" value="List" /> |
                <input type="button" className="btn top-btn" value="Info" /> |
                <input type="button" className="btn top-btn" value="Etc" />
            </div>
        )
    }    
}

export default Collection_detail_list;
