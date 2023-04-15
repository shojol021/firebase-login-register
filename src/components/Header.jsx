import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{marginBottom: '15px'}}>
            <Link style={{marginRight: '15px'}} to='/'>Home</Link>
            <Link style={{marginRight: '15px'}} to='/login'>Login</Link>
            <Link style={{marginRight: '15px'}} to='/register'>Register</Link>
            <Link style={{marginRight: '15px'}} to='/register-rbs'>Register RBS</Link>
        </div>
    );
};

export default Header;