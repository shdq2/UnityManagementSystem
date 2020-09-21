import React, { Component } from 'react';
import * as controller from './controller/authority_controller';
import './authority_template.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import * as authAction from '../../store/modules/authority';
import { bindActionCreators } from 'redux';

import UserItem from './userListItem';
import {Cookies,withCookies} from 'react-cookie';

class Authority_template extends Component {    
    constructor(props){
        super(props);
        const {AuthAction} = this.props;
        controller.getUserList(AuthAction);
    }
    
    render(){
        const {cookies,userList} = this.props;

        const mapToComponent = data => {    
            return data.map((person, i) => {                
              return (<UserItem data={person} key={i}  />);
            });
          };          

        return (
            <div className="auth_template">
                {
                    cookies.get('user_info') == 'root' ?
                        <div>
                            <input type="button" value="create User" />                            
                        </div>
                        :
                        null
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Auth
                            </th>
                            <th>
                                etc
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {mapToComponent(userList)}
                    </tbody>
                </table>
               
            </div>
        )
    }

    componentDidMount(prevProps,prevState){
        const {cookies} = this.props;        
        if(cookies.get('user_info') != "undefined" && cookies.get('user_info') != null ){        
            cookies.set('current_page','shader');
        }else{
            
        }
    }
}

export default connect(
    ({authority}) => ({
        userList:authority.get('userList')
    }),
    (dispatch) =>({
        AuthAction : bindActionCreators(authAction,dispatch)
    })
)(withCookies(Authority_template));
