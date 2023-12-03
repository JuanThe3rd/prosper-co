import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({products: [], total: 0});

    useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(products => {
                const temp_products = [...products];

                for (let i = 0; i < temp_products.length; i++){
                    temp_products[i]['quantity'] = 0;
                }

                setProducts(temp_products);
            })
    }, []);

    console.log(cart);

    return (
        <div>
            <div className='page-background'></div>
            <Navbar cart={cart} removeProductFromCart={removeProductFromCart}/>
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
        if (cart.products.includes(product)){
            for(let i = 0; i < cart.products.length; i++){
                if (cart.products[i].id === product.id){
                    const temp_cart = {...cart};
                    temp_cart.products[i].quantity++;
                    temp_cart.total += product.price;
                    setCart(temp_cart);
                }
            }
        } else {
            const temp_cart = {...cart};
            const temp_product = product;
            product.quantity++;
            temp_cart.products.push(temp_product);
            temp_cart.total += product.price;
            setCart(temp_cart);
        }
    }

    function removeProductFromCart(product){
        const temp_cart = {...cart};

        for (let i = 0; i < cart.products.length; i++){
            if (cart.products[i].id === product.id){
                if (cart.products[i].quantity > 1){
                    temp_cart.products[i].quantity--;
                    temp_cart.total -= product.price;
                    setCart(temp_cart);
                } else {
                    const temp_products = cart.products.filter(cart_product => cart_product.id !== product.id);
                    temp_cart.products = temp_products;
                    temp_cart.total -= product.price;
                    setCart(temp_cart);
                }
            }
        }
    }
}

export default Home;