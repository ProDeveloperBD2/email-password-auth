import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const auth = getAuth(app);
    const [messageError, setMessageError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef()
    const handleLoginSubmit = event => {
        event.preventDefault()
        setMessageError('')
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(`
        Email: ${email}
        Password: ${password}
        `)
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
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                setSuccess('User has been Login Successfully')
                form.reset();
            })
            .catch(error => {
                const message = error.message;
                console.log(message)
                setMessageError(message)
            })
    }
    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please Enter Your Email');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Please Check Your Email')
            })
            .catch(error=>{
                setMessageError(error.message);
                return;
            })
    }
    return (
        <div className='d-flex w-75 mx-auto mt-5'>
            <div className='w-50'>
                <h2 className='text-primary'>Please Login !|!</h2>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>
                    <p className='text-danger'>{messageError}</p>
                    <p className='text-success'>{success}</p>
                    <p>Forget Password? Please <Link onClick={handleResetPassword}>Reset Password</Link></p>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="accepts Terms and Condition" />
                    </Form.Group>
                    <p>New to this Website? Please <Link to="/register">Register</Link></p>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
            <div className='w-50'>
                <video className='w-75 ms-4' src="/src/assets/animation_lmkrg5ow.mp4" autoPlay loop></video>
            </div>
        </div>
    );
};

export default Login;