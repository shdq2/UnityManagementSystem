import React, { Component } from 'react';
import './header_template.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as loginAction from '../../store/modules/login';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {withCookies} from 'react-cookie';
import { withRouter } from 'react-router-dom';

class Header_template extends Component {    
    handleLogout = () =>{
        const {cookies,history} = this.props;        
        cookies.remove('user_info','');
        history.go('/login');
        console.log(history);
    }
    render(){
        const {cookies} = this.props;
        if(cookies.get('user_info') != null && cookies.get('user_info') != undefined){
            return (
                <div className="header">
                    <div className="logoutBtn" onClick={this.handleLogout}>
                        LogOut
                    </div>
                </div>
            )
        }else{
            return (
                ''
            )
        }
        
    }
    
}

export default connect(
    ({login}) => ({
        id:login.get('id'),
        pw:login.get('pw'),
        status:login.get('status')
    }),
    (dispatch) =>({
        LoginActions : bindActionCreators(loginAction,dispatch)
    })
)(withCookies(withRouter(Header_template)));
