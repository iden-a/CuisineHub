import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function UserProfile() {

    const { user } = useAuth0();
    console.log(user)

    return(
        <>
        <h1 className='text-center text-xl mt-8'> User Profile Page </h1>
        <div className='text-center mt-8 text-xl'>
            <h1>Name: {user.nickname.toUpperCase()}</h1>
            <img src={user.picture} className='mx-auto mt-4'/>
            <p className='mt-4'>Email: {user.email}</p>
        </div>
        {/* <button> Link 1</button>
        <button> Link 2</button> */}
        </>
    )
}