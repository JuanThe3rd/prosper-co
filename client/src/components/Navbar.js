import React, { useState, useEffect } from 'react';

function Navbar({ cart, removeProductFromCart, goHome }) {
    const [cartClass, setCartClass] = useState('modal-container hide');
    
    return (
        <div>
            <div className='navbar-container'>
                <img className='nav-home-logo' onClick={goHome} name='home' src={require('../site-images/prosper-logo.png')} title='Home' alt='home-logo' />
                <a className='nav-link' href="">About Us</a>
                <a className='nav-link' onClick={handleCartClick}>Cart</a>
                <a className='nav-link' href="">Sign-In</a>
            </div>

            <div className={cartClass}>
                <span className='close-modal' onClick={() => setCartClass('modal-container hide')}>&times;</span>
                <h2 className='modal-title'>Cart</h2>
                <div className='cart-items-container'>
                    {cart.products.map((product) => (
                        <div>
                            {product.id === cart.products[cart.products.length - 1].id &&
                                <div className='last-cart-product'>
                                    <span className='cart-remove-btn' onClick={() => removeProductFromCart(product)}>&times;</span>
                                    <div className='cart-main-content'>
                                        <img className='cart-product-image' src={product.picture} />
                                        <div className='cart-product-details'>
                                            <p>{product.name}</p>
                                            <p>{product.selected_size}</p>
                                            <p>x{product.quantity}</p>
                                            <p>${product.price * product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {product.id !== cart.products[cart.products.length - 1].id &&
                                <div className='cart-product'>
                                    <span className='cart-remove-btn' onClick={() => removeProductFromCart(product)}>&times;</span>
                                    <div className='cart-main-content'>
                                        <img className='cart-product-image' src={product.picture} />
                                        <div className='cart-product-details'>
                                            <p>{product.name}</p>
                                            <p>{product.selected_size}</p>
                                            <p>x{product.quantity}</p>
                                            <p>${product.price * product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                    {cart.products.length === 0 &&
                        <div>
                            <h3 className='empty-cart'>Your Cart is Empty</h3>
                        </div>
                    }
                </div>

                <div className='modal-checkout-details'>
                    <p className='modal-total'>Total: ${cart.total}</p>
                    <button className='modal-checkout-btn'>Checkout</button>
                </div>
            </div>
        </div>
    )

    function handleCartClick(e){
        if (cartClass === 'modal-container hide'){
            setCartClass('modal-container');
        } else{
            setCartClass('modal-container hide');
        }
    }
}

export default Navbar;