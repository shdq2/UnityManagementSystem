import React, { Component } from 'react';
import './collection_detail_topbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as collectionActions from '../../store/modules/collection';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';


const Collection_detail_topbar = () =>{
    return (        
        <div className="collection_detail_top">
            <input type="button" className="btn top-btn" value="List" /> |
            <input type="button" className="btn top-btn" value="Info" /> |
            <input type="button" className="btn top-btn" value="Etc" />
        </div>
    )
}

export default Collection_detail_topbar;
