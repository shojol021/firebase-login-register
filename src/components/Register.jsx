import React from 'react';

const Register = () => {
    const handleMailId = (e) => {
        e.preventDefault();
        console.log(e.target.email.value)
    }

    return (
        <form onSubmit={handleMailId}>
            <p>Email Address</p>
            <input type="email" name='mail' id="mid" placeholder='Enter your email' />
            <br />
            <p>Password</p>
            <input type="password" name="pass" id="pid" placeholder='Enter your password' />
            <br />
            <input type="submit" value="register" />
        </form>
    );
};

export default Register;