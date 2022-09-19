import React, { createContext, useContext, useEffect, useState } from 'react'
import app from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export function useAuth () {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    
    const auth = getAuth(app)
    const [currentUser, setCurrentUser] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentUser(user)
            }
        })
    }) //eslint-disable-line

    function signUp (email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then(data => {
            setCurrentUser(data.user)
        })
        .catch(err=>{
            toast(((err.toString()).includes('already-in-use') && 'This user already exists, Sign-In'), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            })
        })
    }
    function signIn (email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then(data => {
            setCurrentUser(data.user)
        })
        .catch(err=>{
            toast((err.toString()).includes('wrong') && 'Wrong credentials entered, try again')
        })
    }

    function userSignOut () {
        signOut(auth)
        .then(()=>{
            setCurrentUser('')
            navigate('/sign-in')
        })
        .catch(err=>{
            toast(err)
        })
    }


  return (
    <AuthContext.Provider value={{
        currentUser,
        signUp,
        signIn,
        userSignOut
    }}>
        {children}
    </AuthContext.Provider>
  )
}
