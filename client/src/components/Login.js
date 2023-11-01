import React from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    
  const navigate = useNavigate();
    const [form, setForm] = React.useState( {
        email:"",
       password:"",  
     
    }); 
     
const handleInputChange = event=>{

    const {name, value, type, checked} = event.target
    setForm({...form, [name]: type==='checkbox' ? checked : value})
  }
    

const handleSubmit =  (event)=>{
    event.preventDefault()
  
    alert('Login successful!');
    navigate('/blog')
    
    }
  return (
    <>

    <Navbar/>
    <div className='post-form-container login-container'>
              <h1 className='login-heading'>Login to your account</h1>
              <Link to="/register"><button className='blog-btn' >Don't have an account? Register ▶</button></Link>
              <form onSubmit={handleSubmit}>
          <div className="name-container form-row">
            <div>
             <label htmlFor="email">Email<span className="star">*</span></label>
             <input type="email" id="email" name="email" value={form.email}  onChange={handleInputChange} className='post-input'   required/>     
          </div>      
        </div>
        <div className="userPassword form-row">
             <label htmlFor="password">Password <span className="star">*</span></label>
             <input type="text" id="password" name="password" value={form.password} className='post-input'  onChange={handleInputChange}/>
          </div>
     
          <br/>
          <input type="submit" value="Submit" className='blog-btn' />
        
       </form>

        </div>
    </>
  )
}

export default Login