import React, { Component } from 'react';
import './nav_template.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as loginAction from '../../store/modules/login';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {NavLink}  from 'react-router-dom';
import {withCookies} from 'react-cookie';
import { withRouter } from 'react-router-dom';

class Nav_template extends Component {    
    handleLogout = () =>{
        const {cookies,history} = this.props;
        
        cookies.remove('user_info','');
        this.props.history.push('/login');        
    }
    
    render(){
        const {cookies} = this.props;
        if(cookies.get('user_info') != null && cookies.get('user_info') != undefined){
            return (
                <div className="nav">
                    <NavLink exact to="/">
                        <div className="nav_item">
                            Dash Board
                        </div>
                    </NavLink>
                    <hr style={{color:'white'}}/>
                    <NavLink exact to="/collection">
                        <div className="nav_item">
                            Collection
                        </div>
                    </NavLink>                        
                    <hr style={{color:'white'}}/>
                    <NavLink exact to="/auth">
                        <div className="nav_item">
                            Authority
                        </div>
                    </NavLink>
                    <NavLink exact to="/location">
                        <div className="nav_item">
                            Location
                        </div>
                    </NavLink>
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
)(withCookies(withRouter(Nav_template)));
