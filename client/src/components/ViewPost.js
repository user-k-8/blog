import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import postimg1 from '../components/img/a.jpg'
import postimg2 from '../components/img/c.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { useContext } from 'react';
import { Context } from '../context/Context';

const ViewPost = () => {

  const { user } = useContext(Context);
  const location = useLocation();
  const {element} = location.state;
  const postId = element._id;
  const [post, setPost] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setPost(res.data);
    };
    fetchPost();
  }, []);




  const arr = post?.content.split('.');
  const firsthalfIndex= arr?.length/2
  const section1 = arr?.slice(0,firsthalfIndex).join('.')
  const section2= arr?.slice(firsthalfIndex,arr?.length).join('.')

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`
      );
      window.location.replace("/blog");
    } catch (err) {console.log(err)}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <>
    <div className='view-post-container'  id='top'>
        <Navbar/>
        <div className='view-post-wrapper'>
        {updateMode ? (
          <input
            type="text"
            value={post?.title}
            placeholder="title"
            className="star"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus

          />
        ) : <h1>{post?.title}</h1> }
            <h3>Written by : {post?.author}</h3>
            <h3>Date : {post?.createdAt}</h3>
            <div className='edit-btns'>
          { user ? post?.username === user?.username && <button className='blog-btn' onClick={() => setUpdateMode(true)}>Edit </button> : null }
            <br/>
            { user ? post?.username === user?.username && <button className='blog-btn delete-btn' style={{display: element.display}} onClick={handleDelete}>Delete</button> : null }
            {updateMode && (
          <button className='blog-btn' onClick={handleUpdate}>
            Update
          </button>
        )}
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