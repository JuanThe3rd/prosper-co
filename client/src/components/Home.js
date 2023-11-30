import React from 'react';
import Navbar from './Navbar';

function Home() {
    return (
        <div>
            <div className='page-background'></div>
            <Navbar />
            <div className='home-page'>
                <h1 className='home-title'>Prosper Co.</h1>
                <footer className='home-footer'>
                    <h3>This goes on the bottom</h3>
                    <p className='home-footer-copyright'>Copyright 2023 © Prosper Co.</p>
                </footer>
            </div>
        </div>
    )
}

export default Home;