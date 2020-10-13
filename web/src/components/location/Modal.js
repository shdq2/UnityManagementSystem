import React, { Component, Fragment, useEffect } from 'react';
import './Modal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as collectionActions from '../../store/modules/collection';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';


const Modal = ({isOpen,close,titleChange,addrChange,create}) =>{
    useEffect(()=>{
        document.body.style.cssText = ` top: -${window.scrollY}px`
        return () => {
          const scrollY = document.body.style.top
          document.body.style.cssText = `position: ""; top: "";`
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    },[]);
    return (        
        <Fragment>
            {
            isOpen ?
                <div className="Modal-overlay">
                    <div className="Modal">
                        <div className="Modal-title" >
                            Create New Location
                        </div>                        
                        <div className="Modal-body">                            
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>
                                            Location Title
                                        </th>
                                        <td>
                                            <input type="text" className="form-control" onChange={titleChange}/>
                                        </td>
                                    </tr>     
                                    <tr>
                                        <th>
                                            Location Address
                                        </th>
                                        <td>
                                            <input type="text" className="form-control" onChange={addrChange}/>
                                        </td>
                                    </tr>                                
                                    
                                </tbody>
                                
                            </table>
                        </div>
                        <div className="Modal-footer">                                
                            <input type="button" value="Create" className="btn btn-primary" onClick={create} />    
                            <input type="button" value="Cancel" className="btn btn-danger" onClick={close} />    
                        </div>
                    </div>
                </div>
                :
                null
            }        
        </Fragment>
        
    )
}

export default Modal;
