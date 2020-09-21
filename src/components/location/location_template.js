import React, { Component } from 'react';
import './location_template.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as locationAction from '../../store/modules/location';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import * as controller from './controller/location_controller';
import LocationItem from './locationListItem';
import Modal from './Modal'
import { propTypes } from 'react-bootstrap/esm/Image';
import PropTypes from 'prop-types';
class Location_template extends Component {    
    
    constructor(props){
        super(props);
        const {LocationAction} = this.props;        
        controller.getLocationList(LocationAction);
    }
    changeLocationTitle = (e)=>{
        const {LocationAction} = this.props;            
        LocationAction.changeLocationTitle(e.target.value);        
    }

    changeLocationAddr = (e)=>{
        const {LocationAction} = this.props;               
        LocationAction.changeLocationAddr(e.target.value);        
    }

    changeModalView = ()=>{
        const {LocationAction} = this.props;        
        LocationAction.setModalView();        
    }

    createLocation = ()=>{
        const {LocationAction,cookies,addr,title} = this.props;                
        controller.createLocation(LocationAction,addr,cookies,title,this.changeModalView);        
    }    
    handleChangeRouter = (id,data)=>{
        this.props.history.push({
            pathname:'/location/'+id,
            state:{data:data}
        })        
            
    }

    render(){        
        const {cookies,locationList,modal} = this.props;
        const {changeModalView,changeLocationTitle,createLocation,changeLocationAddr,handleChangeRouter} = this;
        const mapToComponent = data => {    
            return data.map((person, i) => {    
                
              return (<LocationItem data={person} key={i} clickEvent={handleChangeRouter} />);
            });
          };          

        return (
            <div className="auth_template">
                <input type="button" value="create Location" onClick={changeModalView} />
                <Modal isOpen={modal} close={changeModalView} titleChange={changeLocationTitle} addrChange={changeLocationAddr} create={createLocation}></Modal>
                <table className="table location_template_table">
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>                            
                            <th>
                                Address
                            </th>
                            <th style={{width:"20%"}}>
                                User
                            </th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {mapToComponent(locationList)}
                    </tbody>
                </table>
               
            </div>
        )
    }

    componentDidMount(prevProps,prevState){
        const {cookies} = this.props;        
        if(cookies.get('user_info') != "undefined" && cookies.get('user_info') != null ){        
            cookies.set('current_page','shader');
        }    else{
            
        }
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
)(withCookies(Location_template));
