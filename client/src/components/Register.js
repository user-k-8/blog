import React from 'react'
import Navbar from './Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Register = () => {
    
    const navigate = useNavigate();
    const [form, setForm] = React.useState( {
        email:"",
       password:""
      
    }); 

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleInputChange = event=>{
    
    const {name, value, type, checked} = event.target
    setForm({...form, [name]: type==='checkbox' ? checked : value})
    }
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const res = await axios.post("/auth/register", {
          username,
          email,
          password,
        });
        console.log(res)
        res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
      }
    }
  return (
    <>

    <Navbar/>
    <div className='post-form-container login-container' >
              <h1 className='login-heading'>Register for an account</h1>
              <Link to="/login"><button className='blog-btn' >Have an account? Login ▶</button></Link>
              <form onSubmit={handleSubmit}>
          <div className="name-container form-row">
            <div>
             <label htmlFor="email">Username<span className="star">*</span></label>
             <input type="text" id="email" name="email"  
             onChange={(e) => setUsername(e.target.value)} 
             className='post-input'   required
             placeholder="Enter your username..."
             />     
          </div>      
        </div>
        <div className="name-container form-row">
            <div>
             <label htmlFor="email">Email<span className="star">*</span></label>
             <input type="email" id="email" name="email" placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)} className='post-input'   required/>     
          </div>      
        </div>
        <div className="userPassword form-row">
             <label htmlFor="password">Password <span className="star">*</span></label>
             <input type="password" id="password" name="password"  className='post-input'  placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <br/>
          <input type="submit" value="Submit" className='blog-btn' />
        
       </form>

        </div>
    </>
  )
}

export default Register