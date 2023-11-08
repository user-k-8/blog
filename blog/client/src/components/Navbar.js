import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo2.png'
import  bars from './img/bars.png'
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const navigate = useNavigate()
  const mobile = window.innerWidth<=768? true: false;
  const [menuOpened, setMenuOpened] = React.useState(false)

  const storedUser = JSON.parse(localStorage.getItem("blogLogin"));
  const checkLogin= ()=>{
    if(storedUser){
      console.log('yes')
      navigate('/addpost')
    }
    else{
      alert('You are not signed in! Log in to create post')
    }
  }

  const handleLogInOut =()=>{
     if(storedUser){
      localStorage.removeItem("blogLogin")
      navigate('/')
     }
     else{
      navigate('/login')
     }
  }
  return (
    <div className='nav-container'>
        <div className='logo-container'>
                 <img src={logo} alt=''  className='logo'/>
                 <span>Melsoft Academy</span>
        </div>
        {menuOpened==false && mobile==true?
        ( <div onClick={()=>{setMenuOpened(true)}}>
          <img src={bars} alt='' style={{width:'1.5rem', height:'1.5rem'}} className='bars'/>
        </div>) : (
           <div className='nav-elements'>
              <button className='blog-btn' 
              style={{width:'fit-content' , display: window.innerWidth<'769' ? 'block' : 'none'}}
              
              onClick={()=>{setMenuOpened(false)}}>✖ Close</button>
              <Link to= {{pathname:`/`, hash: "top"}} className='nav-txt'><span>Blog</span></Link>
              <Link to= {{pathname:`/register`, hash: "top"}}  className='nav-txt'><span>Register</span></Link>
              <span  className='nav-txt' onClick={handleLogInOut}>{storedUser ? "Logout" : "Login"}</span>
              <span className='nav-txt' onClick={checkLogin}>Create-post</span>
           </div>)
}
    </div>
  )
}

export default Navbar