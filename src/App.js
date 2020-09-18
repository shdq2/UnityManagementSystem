import React, { Component } from 'react';
import './App.css'

import Login_template from './components/Login/login_template'
import Main_template from './components/main/main_template'
import Authority_template from './components/authority/authority_template'
import Location_template from './components/location/location_template'
import Location_detail from './components/location/location_detail';
import Header_template from './components/header/header_template'
import Nav_template from './components/nav/nav_template'
import Collection_template from './components/collection/collection_template'
import Collection_detail from './components/collection/collection_detail'
import Modal from './components/collection/Modal';

import * as loginAction from './store/modules/login';
import * as collectionActions from './store/modules/collection';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Cookies,withCookies} from 'react-cookie';
import {Route,withRouter} from 'react-router-dom'
class App extends Component{
  handleModalOnOff = (e)=>{
    const {CollectionActions} = this.props;     
    CollectionActions.setModal();
    
}
  render(){    
    const {cookies,isOpen} = this.props;
    const {handleModalOnOff} = this;
    let chk = false;
    if(cookies.get('user_info') == "undefined" || cookies.get('user_info') == null || cookies.get('user_info') == '' ){
      chk = false;
    }else{
      chk = true;
    }
    
    return (
      <div className="App">      
      
        <Header_template></Header_template>
        <div className="body-container">
          <Nav_template></Nav_template>
          <div className={chk ? "body-component " : ''} >
            <Route exact path="/" component={Main_template} />
            <Route exact path="/login" component={Login_template} />

            <Route exact path="/collection" component={Collection_template} />
            <Route exact path="/collection/:id" component={Collection_detail} />

            <Route exact path="/auth" component={Authority_template} />
            
            <Route exact path="/location" component={Location_template} />
            <Route exact path="/location/:id" component={Location_detail} />
            
            
          </div>
          
        </div>
        
      </div>
    );
  }
  
  componentDidMount(prevProps,prevState){
    const {cookies} = this.props;
    
    if(cookies.get('user_info') == "undefined" || cookies.get('user_info') == null || cookies.get('user_info') == '' ){
      this.props.history.push('/login');
    }
  }
}

export default connect(
  ({login,collection}) => ({      
      status:login.get('status'),
      isOpen:collection.get('isModalOpen')
  }),
  (dispatch) =>({
      LoginActions : bindActionCreators(loginAction,dispatch),
      
      CollectionActions : bindActionCreators(collectionActions,dispatch)
  })
)(withCookies(withRouter(App)));
