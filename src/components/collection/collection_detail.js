import React, { Component } from 'react';
import './collection_detail.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as collectionActions from '../../store/modules/collection';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import Collection_detail_topbar from './collection_detail_topbar';
import Collection_detail_list from './collection_detail_list';

class Collection_detail extends Component {        
    render(){                        
        
        return (
            <div className="detail_container">
                <Collection_detail_topbar />
                <div className="collection_detail_body">
                    <Collection_detail_list id={this.props.match.params.id}/>
                </div>
            </div>
            
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
        collections:collection.get('collections')
    }),
    (dispatch) =>({
        CollectionActions : bindActionCreators(collectionActions,dispatch)
    })
)(withCookies(Collection_detail));
