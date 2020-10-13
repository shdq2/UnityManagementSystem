import React, { Component } from 'react';
import axios from 'axios';

const getUserList = (action)=>{
    axios.get('http://localhost:4000/user/getUser').then(res =>{
        if(res.data.error) return;
        action.setUserList(res.data.result);        
    })
}

const test2 = () =>{
    console.log("test2");
}

export {getUserList};
export {test2};
