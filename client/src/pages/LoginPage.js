import React, { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [username, Setusername] = useState('');
  const [password, Setpassword] = useState('');
  const [redirect, Setredirect] = useState(false);
  const {setuserInfo} = useContext(UserContext)

  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}, // save cookie inside react app
      credentials: 'include',
    });
    if(response.ok){
      // redirect to home page
      // json function is async
      response.json().then(userInfo =>{
        // before redirect set context info
        setuserInfo(userInfo);
        Setredirect(true);
      })
      
    } else{
      alert('wrong credentials')
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form className="login" onSubmit={login}>
    <h1>Login</h1>
      <input type='text' placeholder='username'
          value={username}
          onChange={ev => Setusername(ev.target.value)}
      />
      <input type='password' placeholder='password'
      value = {password}
      onChange={ev => Setpassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  )
}
