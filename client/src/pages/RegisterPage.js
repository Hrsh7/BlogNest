import React, { useState } from 'react'

export default function RegisterPage() {
  const [username, Setusername] = useState('');
  const [password, Setpassword] = useState('password');

  async function register(ev){
    ev.preventDefault();
    /// send a post request to the server
      const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    });
    if(response.status == 200){
      alert('registration successful')
    }else{
      alert('registration failed')
    }

  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type='text'             placeholder='username' 
      value={username}
      onChange={ev => Setusername(ev.target.value)}
      />
      <input type='password' placeholder='password' 
      value={password}
      onChange={ev => Setpassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  )
}
