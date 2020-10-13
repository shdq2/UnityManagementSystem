import React from 'react';
import {toJS} from 'immutable'
import './userListItem.css';
const UserItem = ({data})=>{
    const list =data.toJS(); 
    
    return (
        <tr>
            <td>
                {list.user_id} 
            </td>
            <td>
            {list.user_name} 
            </td>
            <td>
            {list.user_auth  == 0? 
                "All"
            :
                "Read"
            }
            </td>
            <td style={{width:"30%"}} >
                <input type="button" value="Change" />
                <input type="button" value="Delete" />
            </td>
        </tr>        
    )
}

export default UserItem;