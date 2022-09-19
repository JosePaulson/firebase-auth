import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {

    const { currentUser, userSignOut } = useAuth()

    function handleClick () {
        userSignOut()
    }

  return (
    currentUser && <div>
        <h1>{currentUser.email}</h1>
        <button type="button" onClick={handleClick} className='btn btn-primary'>Sign Out</button>
    </div>
  )
}

export default Profile