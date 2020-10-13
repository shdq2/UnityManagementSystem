import React, { Fragment } from 'react';
import {toJS} from 'immutable'
import './locationListItem.css'
import { NavLink } from 'react-bootstrap';
const LocationItem = ({data,clickEvent})=>{
    const list =data.toJS(); 
    return (
        <Fragment>
            
                <tr onClick={()=>{clickEvent(list.loc_id,list )}}>
                    <td>
                        {list.loc_title} 
                    </td>            
                    <td>
                        {list.loc_addr} 
                    </td>
                    <td>
                        {list.user_id} 
                    </td>            
                </tr>        
            
        </Fragment>
    )
}

export default LocationItem;