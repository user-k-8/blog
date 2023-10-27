import React from 'react'
import Navbar from './Navbar'
import postimg1 from '../components/img/a.jpg'
import postimg2 from '../components/img/c.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Footer from './Footer';
import { useDispatch } from 'react-redux';

const ViewPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDelete =()=>{
    dispatch({ type: 'DELETE_POST', payload: element.post});
    navigate('/blog')
}
  const location = useLocation();
  const {element} = location.state;
  const arr = element.post.split('.');
  const firsthalfIndex= arr.length/2
  const section1 = arr.slice(0,firsthalfIndex).join('.')
   const section2= arr.slice(firsthalfIndex,arr.length).join('.')
  console.log(section1)
  return (
    <>
    <div className='view-post-container'  id='top'>
        <Navbar/>
        <div className='view-post-wrapper'>
            <h1>{element.title}</h1>
            <h3>Written by : {element.author}</h3>
            <h3>Date : {element.date}</h3>
            <div className='edit-btns'>
           <button className='blog-btn'>Edit </button>
            <br/>
           <button className='blog-btn delete-btn' style={{display: element.display}} onClick={handleDelete}>Delete</button>
       </div>
            <p className='post-content'>  
            <img src={postimg1} alt='' className='view-post-img1'/>
            <span >{section1}</span>     
            </p>
            <p className='post-content'>  
            
           
            <img src={postimg2} alt='' className='view-post-img2'/>
            <span >{section2}</span>    
            </p>
           
        </div>
        <Comments/>
        <br/>
        <Footer/>
    </div>
   
    </>
  )
}

export default ViewPost