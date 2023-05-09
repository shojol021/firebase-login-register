import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { app } from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [succsess, setSuccess] = useState('')
    const [password, setPassword] = useState('password')
    const [isTrue, setIsTrue] = useState(true)
    const emailField = useRef()

    const handleLogin = event => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        setError('')
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please at least 1 uppercase')
            return;
        }
        else if (!/(?=.[0-9])/.test(password)) {
            setError('at least one numeric')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(userDetails => {
                const loggedUser = userDetails.user;
                console.log(loggedUser)
                setSuccess('Successfully logged in')
                if (!loggedUser.emailVerified) {
                    verifyEmail(loggedUser)
                }
            })
            .catch(error => {
                console.log(error.code)
                console.log(error.message)
            })
    }

    const verifyEmail = (loggedUser) => {
        sendEmailVerification(loggedUser)
            .then(res => {
                console.log(res)
                alert(`A verification email sent to ${loggedUser.email}`)
            })
            .catch(error => {
                console.log(error.code)
                console.log(error.message)
            })
    }

    const resetPassword = () => {
        const email = emailField.current.value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent')
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }

    let check = true;
    const handleShowPassowrd = (check) => {
        console.log(check)
        check? setPassword('password') : setPassword('text');
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='w-25'>
                <div className="form-group mb-2">
                    <label htmlFor="email">Email address</label>
                    <input ref={emailField} type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input type={password} className="form-control" id="password" placeholder="Password" required />
                    <p><small onClick={() => handleShowPassowrd(setIsTrue(!check))} className='btn btn-link'>Show Password</small></p>
                </div>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{succsess}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forgot Password? <button onClick={resetPassword} className='btn btn-link'> Reset</button></small></p>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
        </div>
    );
};

export default Login;