import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';

function Product(){
    const location = useLocation();
    const product = location.state[0];
    const cart = location.state[1];

    return (
        <div className='page-background'>
            <Navbar cart={cart}/>
            <h1>{product.name}</h1>
        </div>
    )
}

export default Product;