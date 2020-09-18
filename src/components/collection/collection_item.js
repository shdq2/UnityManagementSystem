import React, { Component } from 'react';
import './collection_item.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CollectionItem = ({data})=>{    
    const item =data.toJS();     
    return (
        <Link exact to={`collection/${item.col_id}`} >
            <div className="item_div col-md-3 col-6" >                        
                {item.col_name}
            </div>
        </Link>
    )
}

export default CollectionItem;