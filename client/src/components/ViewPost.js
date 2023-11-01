import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import postimg1 from '../components/img/a.jpg'
import postimg2 from '../components/img/c.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import axios from "axios";

const ViewPost = () => {

  const location = useLocation();
  const {element} = location.state;
  const postId = element._id;
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setPost(res.data);
      console.log("test page")
    };
    fetchPost();
  }, []);


  const arr = post?.content.split('.');
  const firsthalfIndex= arr?.length/2
  const section1 = arr?.slice(0,firsthalfIndex).join('.')
  const section2= arr?.slice(firsthalfIndex,arr?.length).join('.')

  const handleDelete = () =>{};

  return (
    <>
    <div className='view-post-container'  id='top'>
        <Navbar/>
        <div className='view-post-wrapper'>
            <h1>{post?.title}</h1>
            <h3>Written by : {post?.author}</h3>
            <h3>Date : {post?.createdAt}</h3>
            <div className='edit-btns'>
           <button className='blog-btn'>Edit </button>
            <br/>
           {/* <button className='blog-btn delete-btn' style={{display: element.display}} onClick={handleDelete}>Delete</button> */}
       </div>
            <p className='post-content'>  
            <img src={post?.image} alt='' className='view-post-img1'/>
            <span >{section1}</span>     
            </p>
            <p className='post-content'>  
            
           
            <img src={postimg2} alt='' className='view-post-img2'/>
            <span >{section2}</span>    
            </p>
           
        </div>
        {/* <Comments/> */}
        <br/>
        <Footer/>
    </div>
   
    </>
  )
}

export default ViewPost