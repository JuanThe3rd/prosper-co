import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(setProducts)
    }, [])

    console.log(products);

    return (
        <div>
            <div className='page-background'></div>
            <Navbar />
            <div className='home-page'>
                <h1 className='home-title'>Prosper Co.</h1>

                <div className='products-container'>
                    {products.map((product) => (
                        <div className='product-card'>
                            <img className='product-img' src={product.picture} alt={`${product.name} img`} />
                            <h2>{product.name}</h2>
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
}

export default Home;