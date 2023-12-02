import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(setProducts)
    }, []);

    return (
        <div>
            <div className='page-background'></div>
            <Navbar cart={cart}/>
            <div className='home-page'>
                <h1 className='home-title'>Prosper Co.</h1>

                <div className='products-container'>
                    {products.map((product) => (
                        <div className='product-card'>
                            <img className='product-img' src={product.picture} alt={`${product.name} img`} />
                            <p className='product-title'>{product.name}</p>
                            <div className='product-details'>
                                <p className='product-price'>Price: ${product.price}</p>
                                <button className='add-to-cart-btn' onClick={() => addProductToCart(product)}>Add to Cart</button>
                                {product.description &&
                                    <p>{product.description}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <footer className='home-footer'>
                    <h3>This goes on the bottom</h3>
                    <p className='home-footer-copyright'>Copyright 2023 © Prosper Co.</p>
                </footer>
            </div>
        </div>
    )

    function addProductToCart(product){
        setCart([...cart, product])
    }
}

export default Home;