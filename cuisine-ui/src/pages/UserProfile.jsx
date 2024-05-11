import React from 'react';
import useAuth from '../auth';

export default function UserProfile() {
    const { user, userId } = useAuth(); // Get user and userId from useAuth hook
    console.log(userId)

    return(
        <>
        <h1 className='text-center text-xl mt-8'> User Profile Page </h1>
        <div className='text-center mt-8 text-xl'>
            <h1>Name: {user.nickname.toUpperCase()}</h1>
            <img src={user.picture} alt="User" className='mx-auto mt-4'/>
            <p className='mt-4'>Email: {user.email}</p>
            <p className='mt-4'>User ID: {userId}</p> {/* Display userId */}
        </div>
        </>
    )
}
