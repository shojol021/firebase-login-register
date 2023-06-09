import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { app } from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Register = () => {
    const auth = getAuth(app)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState([])

    const handleMailId = (e) => {
        e.preventDefault();
        setSuccess('')

        const email = e.target.mail.value
        const password = e.target.pass.value
        const name = e.target.name.value

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please at least 1 uppercase')
            return;
        }
        else if (!/(?=.[0-9])/.test(password)) {
            setError('at least one numeric')
            return
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser)
                setUser(loggedUser)
                setError('')
                setSuccess('successfully signed up')
                e.target.reset()
                handleUserName(loggedUser, name)

            })
            .catch(err => {
                console.log(err.code)
                console.log(err.message)
                setError(err.message)
            })
    }

    const handleUserName = (user, name) => {
        updateProfile(user, {
            displayName: name
        } )
    }

    return (
        <div>
            <form onSubmit={handleMailId}>
                <p>Name</p>
                <input type="text" name='name' id="name" placeholder='Enter your name' required />
                <br />
                <p>Email Address</p>
                <input type="email" name='mail' id="mid" placeholder='Enter your email' required />
                <br />
                <p>Password</p>
                <input type="password" name="pass" id="pid" placeholder='Enter your password' required />
                <br />
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <input className='btn btn-primary' type="submit" value="register" />
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link> here</small></p>
        </div>

    );
};

export default Register;