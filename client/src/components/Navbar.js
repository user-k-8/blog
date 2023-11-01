import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo2.png'
import  bars from './img/bars.png'
import { useContext } from 'react';
import { Context } from '../context/Context';
const Navbar = () => {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const mobile = window.innerWidth<=768? true: false;
  const [menuOpened, setMenuOpened] = React.useState(false)
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
             <Link to="/" className='nav-txt'><span>Home</span></Link>
              <Link to="/blog" className='nav-txt'><span>Blog</span></Link>
              <Link to="/addpost" className='nav-txt'><span>Create-post</span></Link>
              {!user && <Link to="/login" className='nav-txt'><span>Login</span></Link>}
              {user &&  <span className='nav-txt' onClick={handleLogout}>LogOut</span>}
              {!user && <Link to="/register" className='nav-txt'><span>Register</span></Link>}
              {user &&  <span className='nav-txt-name'>{user.username}</span>}
             
           </div>)
}
    </div>
  )
}

export default Navbar