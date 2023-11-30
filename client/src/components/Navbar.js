import React from 'react';

function Navbar() {
    return (
        <div>
            <div className='navbar-container'>
                <img className='nav-home-logo' src={require('../site-images/prosper-logo.png')} title='Home' alt='home-logo' />
                <a className='nav-link'>About Us</a>
                <a className='nav-link'>Cart</a>
                <a className='nav-link'>Sign-In</a>
            </div>
        </div>
    )
}

export default Navbar;