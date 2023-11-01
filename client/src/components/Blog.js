import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import BlogPostCard from './BlogPostCard'
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux';
import Footer from './Footer'
import axios from "axios";
import { useLocation } from "react-router";

const Blog = (props) => {
  const dispatch = useDispatch([])

  const [posts, setPosts] = useState();

  useEffect(() => {
    console.log("hello world")
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
      console.log(res.data)
      console.log("first")
    };
    fetchPosts(posts);
  }, []);

  
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.blog_posts.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className='blog-container'>
            <div className='blog-hero'>
            <Navbar/>
            <div className='hero-text'>
                <h1>Melsoft <br/> Academy<br/> Blog</h1>
                <h3>read and explore new tech insights</h3>
              
               <button className='hero-btn'>Get Started</button>
            </div>
        </div>
        <div className='blog-posts-container'>
          <br/>
          <h1 id='posts-top'>Our blog posts</h1>
          <div className='blog-cards'>
          {(typeof currentItems == 'undefined') ? (
        <p>Loading...</p>
      ):(
        posts?.map((item, i)=>(
          <p key={i}><BlogPostCard element={item}/></p>
        ))
      )}
                  
            </div>
            <br/>
            <div className='load-buttons-container'>
           <a href='#posts-top'> <button className='load-btn' onClick={prevPage} disabled={currentPage === 1}>
               Prev
            </button></a>
            <a href='#posts-top'>  <button className='load-btn' onClick={nextPage} disabled={currentItems.length < itemsPerPage}>
                   Next
            </button></a>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

const mapStateToProps = (state)=>{

  return{
    blog_posts: state.blog_posts
  }
}

export default connect(mapStateToProps)(Blog)