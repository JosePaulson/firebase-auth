import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'


function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signUp, currentUser } = useAuth()
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        currentUser && navigate('/profile')
        setLoading(false)
    },[currentUser]) //eslint-disable-line

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            toast('The passwords don\'t match')
            return
        }

        try {
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
        } catch (err) {
            toast('Failed to create and account')
        }

    }

  return (
    <div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className='mb-2' id="passoword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group className='mb-2' id="passoword-confirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} required />
                    </Form.Group>
                    <Button className='w-100' type="submit">{loading ? 'Signing Up...' : 'Sign Up'}</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/sign-in'>Sign In</Link>
        </div>
    </div>
  )
}

export default SignUp