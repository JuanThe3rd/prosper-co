import React, { useState } from 'react';

function Navbar({ cart }) {
    const [modal, setModal] = useState(null);

    console.log(cart);
        
    return (
        <div>
            <div className='navbar-container'>
                <img className='nav-home-logo' src={require('../site-images/prosper-logo.png')} title='Home' alt='home-logo' />
                <a className='nav-link' href="">About Us</a>
                <a className='nav-link' onClick={handleCartClick}>Cart</a>
                <a className='nav-link' href="">Sign-In</a>
            </div>

            {modal &&
                <div className='modal-container'>
                    <span className='close-modal' onClick={() => setModal(null)}>&times;</span>
                    <h2 className='modal-title'>Cart</h2>
                    <div className='cart-items-container'>
                        {cart.length !== 0 &&
                            <div>
                                {cart.map((product) => (
                                    <div>
                                        <h3>{product.name}</h3>
                                    </div>
                                ))}
                            </div>
                        }
                        {cart.length === 0 &&
                            <div>
                                <h3 className='empty-cart'>Your Cart is Empty</h3>
                            </div>
                        }
                    </div>

                    <div className='modal-checkout-details'>
                        <p className='modal-total'>Total: $0</p>
                        <button className='modal-checkout-btn'>Checkout</button>
                    </div>
                </div>
            }
        </div>
    )

    function handleCartClick(e){
        if (modal === null){
            setModal(true);
        } else if (modal !== null){
            setModal(null);
        }
    }
}

export default Navbar;