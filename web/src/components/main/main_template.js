import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as loginAction from '../../store/modules/login';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';

class Main_template extends Component {    
    
    render(){        
        return (
            <div className="Login_Container">
               main
            </div>
        )
    }
    componentDidMount(prevProps,prevState){
        const {cookies} = this.props;        
        if(cookies.get('user_info') != "undefined" && cookies.get('user_info') != null ){            
            cookies.set('current_page','');
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
)(withCookies(Main_template));
