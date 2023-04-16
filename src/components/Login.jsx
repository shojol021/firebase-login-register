import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { app } from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('')
    const [succsess, setSuccess] = useState('')

    const handleLogin = event => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        const auth = getAuth(app)
        signInWithEmailAndPassword(auth, email, password)
            .then(userDetails => {
                const loggedUser = userDetails.user;
                console.log(loggedUser)
            })
        .catch(error => {
            console.log(error.code)
            console.log(error.message)
        })

        setError('')
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please at least 1 uppercase')
            return;
        }
        else if (!/(?=.[0-9])/.test(password)) {
            setError('at least one numeric')
            return
        }
        else if (!/(?=.[!"£$%^&*(){}[]:;'@?><.,])/.test(password)) {
            setError('at least one special character')
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='w-25'>
                <div className="form-group mb-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <p className='text-danger'>{error}</p>
                <p className='text-succsess'>{succsess}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
        </div>
    );
};

export default Login;