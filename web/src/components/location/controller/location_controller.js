import React, { Component } from 'react';
import axios from 'axios';
import * as uuid from 'uuid';

const getLocationList = (action)=>{
    
    
    axios.get('http://localhost:4000/location/getLocationList').then(response =>{
        const data =response.data;

        if(data.error) return;

        action.setLocationList(data.result);
    })
}

const createLocation = async (action,addr,cookies,title,changeModal)=>{
    let result = {};
    const id = uuid.v4();
    const newDate = new Date();
    const now = newDate.getFullYear() + "/" + (newDate.getMonth()+1) + "/"+newDate.getDate()+" "+ newDate.getHours()+ ":"+newDate.getMinutes()+":"+newDate.getSeconds();
    addr = addr.replace(/\\/gi,'\\\\');
    const sendData = {
        id:id,
        addr:addr,
        date:now,
        user_id:cookies.get('user_info'),
        title:title
    }   
    axios.post('http://localhost:4000/location/createLocation',sendData).then(res =>{
        const data =res.data;    
            
        if(data.error){
            console.log(data.error);
        
        }

        getLocationList(action);       
        changeModal();
    })
}


export {getLocationList};
export {createLocation};