import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase/firebase.init';

const Register = () => {
    const auth = getAuth(app)

    const [user, setUser] = useState([])

    const handleMailId = (e) => {
        e.preventDefault();
        const email = e.target.mail.value
        const password = e.target.pass.value
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const loggedUser = res.user
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch(err => {
            // console.log(err.code)
            console.log(err.message)
        })
        
        
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