import React from 'react';

function Navbar() {
    return (
        <div className='navbar-container'>
            <a className='nav-link' href='/'>Home</a>
            <a className='nav-link'>About Us</a>
            <a className='nav-link'>Cart</a>
            <a className='nav-link'>Sign-In</a>
        </div>
    )
}

export default Navbar;