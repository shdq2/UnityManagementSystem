import React, { Component } from 'react';
import './login_template.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login_form from './login_form';

import {connect} from 'react-redux';
import * as loginAction from '../../store/modules/login';
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';

class Login_template extends Component {    
    handleIdChange = (e)=>{        
        const {LoginActions} = this.props;        
        LoginActions.change_id(e.target.value);        
    }

    handlePwChange = (e) =>{
        const {LoginActions} = this.props;        
        LoginActions.change_pw(e.target.value);    
        
    }

    handleLogin = () =>{
        const {id,pw,cookies} = this.props;              
                  
        axios.post('http://localhost:4000/auth/login',{id:id,pw:pw})
        .then(response =>{
            const {LoginActions} = this.props;        
            if(response.data.result.length == 1){                
                LoginActions.login_success();
                cookies.set('user_info',this.props.id);            
                this.props.history.push('/');
                //console.log(response.data.result[0].user_id);
            }else{                
                console.log("not Invalid User Data");
                LoginActions.login_failed();
            }                  
        });        
    }
    render(){
        const {handleIdChange,handlePwChange,handleLogin} = this;
        return (
            <div className="Login_Container">
                <div className="Login_header">
                    Shader Management System
                </div>
                <Login_form
                    change_id={handleIdChange}
                    change_pw={handlePwChange}
                    login={handleLogin}
                ></Login_form>
            </div>
        )
    }

    componentDidMount(prevProps,prevState){
        const {cookies} = this.props;
        var currentPage = cookies.get('current_page');
        if(cookies.get('user_info') == "undefined" || cookies.get('user_info') == null ){
          this.props.history.push('/login');
        }else{
          if(cookies.get('current_page') == null || cookies.get('current_page') == undefined){        
            currentPage = "";
          }
          this.props.history.push('/');
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
)(withCookies(withRouter(Login_template)));
