import React, { useContext } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from "axios";
import {Context} from "../context/Context";

const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/blog");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };


  return (
    <>

    <Navbar/>
    <div className='post-form-container login-container'>
              <h1 className='login-heading'>Login to your account</h1>
              <Link to="/register"><button className='blog-btn' >Don't have an account? Register ▶</button></Link>
              <form onSubmit={handleSubmit}>
          <div className="name-container form-row">
            <div>
             <label htmlFor="username">Username<span className="star">*</span></label>
             <input type="text" id="username" name="username"   placeholder="Enter your username..." className='post-input' ref={userRef}   required/>     
          </div>      
        </div>
        <div className="userPassword form-row">
             <label htmlFor="password">Password <span className="star">*</span></label>
             <input type="password" id="password" name="password" className='post-input'  placeholder="Enter your password..."
          ref={passwordRef}/>
          </div>
     
          <br/>
          <input type="submit" value="Submit" className='blog-btn' disabled={isFetching} />
        
       </form>

        </div>
    </>
  )
}

export default Login