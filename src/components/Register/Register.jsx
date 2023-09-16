import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import './Register.css'
import { Link } from 'react-router-dom';

const Register = () => {
    const auth = getAuth(app);
    const [messageError, setMessageError] = useState('');
    const [success, setSuccess] = useState('')
    const handeleRegisterSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        setMessageError('')
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(`
        Name: ${name}
        Email: ${email}
        Password: ${password}
        `);

        if (!/(?=.*[A-Z])/.test(password)) {
            setMessageError('Please add at least one uppercase');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setMessageError('Please add at least two numbers');
            return;
        }
        else if (password.length < 6) {
            setMessageError('Please add at least 6 characters in your password');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                setMessageError('');
                sendVerificationEmail(userCredential.user);
                updateUserData(userCredential.user, name)
                event.target.reset();
                setSuccess('User has been Created Successfully')
            })
            .catch(error => {
                const message = error.message;
                console.log(message)
                setMessageError(message)
            })
    }
    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                alert('Please Check Your Mail Box and Verification Your account')
            })
    }
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated')
            })
            .catch(error => {
                setMessageError(error.message)
            })
    }
    return (
        <div className='mb-css'>
            <div className='w-75 mx-auto bg-primary rounded mt-css p-5 d-flex shadow'>
                <div className='w-50'>
                    <h2 className='text-white m-2'>Please Register !|!</h2>
                    <form onSubmit={handeleRegisterSubmit}>
                        <input className='text-primary fw-bold m-2 w-100' type="text" name="name" id="name" placeholder='Enter Name' />
                        <input className='text-primary fw-bold m-2 w-100' type="email" name="email" id="email" placeholder='Your Email' required />
                        <br />
                        <input className='text-primary fw-bold m-2 w-100' type="password" name="password" id="password" placeholder='Your Password' required />
                        <br />
                        <p className='text-white'>{messageError}</p>
                        <p className='text-white'>{success}</p>
                        <p className='text-white'>Already have an account? Please <Link className='text-white' to="/login">Login</Link></p>
                        <input className='text-primary fw-bold bg-white rounded px-4 py-1 m-2 w-50' type="submit" value="Register" />
                    </form>
                </div>
                <div className='lottie-w-css'>
                    <img className='w-100' src="/src/assets/L0IS6PxLZs.gif" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Register;