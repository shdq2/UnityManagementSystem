import React, { Component } from 'react';
import './location_detail.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as locationAction from '../../store/modules/location';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import * as uuid from 'uuid';
class Location_detail extends Component {        
    render(){    
        const data = this.props.location.state.data;
        return (
            <div className="detail_container">                
                <div className="location_detail_body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Title
                                </th>
                                <th>
                                    {data.loc_title}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <td>
                                    {data.loc_id}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Address
                                </th>
                                <td>
                                    {data.loc_addr}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Create User
                                </th>
                                <td>
                                    {data.user_id}
                                </td>
                            </tr>                            
                        </tbody>                        
                    </table>
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
    ({location}) => ({
        locationList:location.get('locationList'),
        modal:location.get('modal'),
        addr:location.get('addr'),
        title:location.get('title')
    }),
    (dispatch) =>({
        LocationAction : bindActionCreators(locationAction,dispatch)
    })
)(withCookies(Location_detail));
