import React from 'react';
import './login_form.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Login_form = ({change_id,change_pw,login})=>{
    return (        
        <div className="Login_form">
            <input type="text" placeholder="User Id" className="form-control" onChange={change_id}/>
            <input type="password" placeholder="User Pw"  className="form-control" onChange={change_pw}/>
            <input type="button" value="Login" className="btn btn-success" onClick ={login}/>
        </div>
    )
}

export default Login_form;
