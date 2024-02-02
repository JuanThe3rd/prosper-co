import React, { useState, useEffect } from 'react';
function Navbar({ cart, removeProductFromCart, goHome}) {
    const [modalClasses, setModalClasses] = useState({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'});
    const [loginData, setLoginData] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        fetch('/accounts')
            .then(res => res.json())
            .then(setAccounts);
    }, []);
    
    return (
        <div>
            <div className='navbar-container'>
                <img className='nav-home-logo' onClick={goHome} name='home' src={require('../site-images/prosper-logo.png')} title='Home' alt='home-logo' />
                <div className='toggled-navbar-menu'>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <div className='toggled-navlinks'>
                    <a className='nav-link' href="">About Us</a>
                    <a className='nav-link' onClick={handleCartClick}>Cart</a>
                    <a className='nav-link' onClick={handleSignClick}>Sign-In</a>
                </div>
            </div>

            <div className={modalClasses['cart']}>
                <span className='close-modal' onClick={() => setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'})}>&times;</span>
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
                                            <p className='cart-product-name'>{product.name}</p>
                                            <div className='cart-product-size-quan'>
                                                <p className='cart-product-size'>{product.selected_size}</p>
                                                <p className='cart-product-quantity'>x{product.quantity}</p>
                                            </div>
                                            <p className='cart-product-total'>${product.price * product.quantity}</p>
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
                                            <p className='cart-product-name'>{product.name}</p>
                                            <div className='cart-product-size-quan'>
                                                <p className='cart-product-size'>{product.selected_size}</p>
                                                <p className='cart-product-quantity'>x{product.quantity}</p>
                                            </div>
                                            <p className='cart-product-total'>${product.price * product.quantity}</p>
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

            <div className={modalClasses['sign-in']}>
                <span className='close-modal' onClick={() => setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'})}>&times;</span>
                <h2 className='modal-title'>Sign-In</h2>
                <div>
                    <div className='input-group'>
                        <input className='login-input' required type='text' id='email' name='email' onChange={handleChange} value={loginData['email'] ? loginData['email']: ''}/>
                        <label className='login-label' for='e-mail'>E-Mail</label>
                    </div>

                    <div className='input-group'>
                        <input className='login-input' required type='password' id='password' name='password' onChange={handleChange} value={loginData['password'] ? loginData['password']: ''}/>
                        <label className='login-label' for='password'>Password</label>
                    </div>

                    <button className='login-btn' onClick={signIn}>Sign-In</button>
                </div>
            </div>
        </div>
    )

    function signIn(){
        let temp_account = null;

        for (let i = 0; i < accounts.length; i++){
            if (accounts[i].email === loginData.email && accounts[i].password === loginData.password){
                temp_account = accounts[i];
            }
        }

        setAccount(temp_account);
        setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'});
        setLoginData({});
        alert(`Welcome ${temp_account.firstname}!`)
    }

    function handleCartClick(e){
        if (modalClasses['cart'] === 'cart-modal-container hide'){
            setModalClasses({'cart': 'cart-modal-container', 'sign-in': 'sign-modal-container hide'});
        } else {
            setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'});
        }

        setLoginData({});
    }

    function handleSignClick(e){
        if (modalClasses['sign-in'] === 'sign-modal-container hide'){
            setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container'});
        } else {
            setModalClasses({'cart': 'cart-modal-container hide', 'sign-in': 'sign-modal-container hide'});
        }

        setLoginData({});
    }

    function handleChange(e){
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }
}

export default Navbar;