import React, {useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  // the information of user shouldn't be in header component but rather it should be inside a context // so to fix it we create userContext
  const {setuserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    // use then or await
    fetch('http://localhost:4000/profile',{ 
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        // iside userInfo we have username and id
        setuserInfo(userInfo);
      })
    })
  }, []);

  // invalidate the cookie in backend or frontend but here we do in backend
  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setuserInfo(null);
  }

  // sometime userInfo may be null
  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {username && (
          <>
            <Link to="/create" >Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
          
        </nav>
      </header>
  )
}
