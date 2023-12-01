import React from 'react';

function Navbar() {
    return (
        <div>
            <div className='navbar-container'>
                <img className='nav-home-logo' src={require('../site-images/prosper-logo.png')} title='Home' alt='home-logo' />
                <a className='nav-link' href="">About Us</a>
                <a className='nav-link' href="">Cart</a>
                <a className='nav-link' href="">Sign-In</a>
            </div>
        </div>
    )
}

export default Navbar;