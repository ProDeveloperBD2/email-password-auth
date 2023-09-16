import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterRBS = () => {
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(`
        Email: ${email}
        Password: ${password}
        `)
    }
    return (
        <div className='d-flex w-75 mx-auto mt-5'>
            <div className='w-50'>
                <h2 className='text-primary'>Please Register !|!</h2>
                <Form onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="accepts Terms and Condition" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
            <div className='w-50'>
                <video className='w-75 ms-4' src="/src/assets/animation_lmhuhnny.mp4" autoPlay loop></video>
            </div>
        </div>
    );
};

export default RegisterRBS;