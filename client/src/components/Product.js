import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';

function Product(){
    const location = useLocation();
    const product = location.state[0];
    const cart = location.state[1];

    console.log(product.picture);

    return (
        <div>
            <div className='page-background'></div>
            <Navbar cart={cart}/>

            <div className='product-page-main-content'>
                <div className='product-images-container'>
                    <img className='product-displayed-image' src={product.picture} alt={`product${product.id}_img`} />
                </div>

                <div className='product-page-details'>
                    <h1>{product.name}</h1>
                    <h2>{product.category}</h2>
                    <h3 className='product-page-price'>${product.price}</h3>

                    <div className='product-page-sizes-container'>
                        {product.sizes.split(',').map(size => (
                            <div className='product-page-size-btn-container'>
                                <button>{size}</button>
                            </div>
                        ))}
                    </div>

                    <button>Add to Cart</button>
                </div>
            </div>

            <footer className='home-footer'>
                <p>Placeholder</p>
                <p className='home-footer-copyright'>Copyright 2023 © Prosper Co.</p>
            </footer>
        </div>
    )
}

export default Product;