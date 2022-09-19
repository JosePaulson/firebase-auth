import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'


function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signIn, currentUser } = useAuth()

    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(false)

    useEffect (()=>{
        currentUser && navigate('/profile')
        setLoading(false)
    },[currentUser]) //eslint-disable-line

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await signIn(emailRef.current.value, passwordRef.current.value)
        } catch (err) {
            toast('Failed to sign in')
        }
    }

  return (
    <div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className='mb-2' id="passoword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button className='w-100' type="submit">{loading ? 'Signing In...' : 'Sign In'}</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Not registered? {<Link to='/'>Sign Up</Link>}
        </div>
    </div>
  )
}

export default SignUp