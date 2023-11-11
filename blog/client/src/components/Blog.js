import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import BlogPostCard from './BlogPostCard'
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import Footer from './Footer'

const Blog = (props) => {

  // https://blog-fzhg.onrender.com
  const [backendData, setBackendData] =useState([])

  useEffect(()=>{

    fetch("https://blog-fzhg.onrender.com/posts/api/allposts").then(
      response => response.json()
    ).then(
      data=> {
          setBackendData(data)
      }
    ).catch(error => {
      console.error('Error:', error);
  });

  },[])

  if(!backendData){
    return <div  className='loading-text'>Loading...</div>
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = backendData.slice(indexOfFirstItem, indexOfLastItem);
  const maxPages = Math.ceil(backendData.length/itemsPerPage)
 console.log(maxPages)

  const pageScroll=(id)=>{
    const element = document.getElementById(id);
    if (element) {
   element.scrollIntoView({
     behavior: "smooth",
     block: "start",
   });
  }}

  const nextPage = (id) => {
     if(currentPage<maxPages){
        setCurrentPage(currentPage + 1);
       pageScroll(id)
     }
  };

  const prevPage = (id) => {
    if (currentPage > 1) {
  
      setCurrentPage(currentPage - 1)
      pageScroll(id)
    }
  }

  return (
    <div className='blog-container' id='top'>
            <div className='blog-hero'>
            <Navbar/>
            <div className='hero-text'>
                <h1>Melsoft <br/> Academy<br/> Blog</h1>
                <h3>read and explore new tech insights</h3> 
               <button className='hero-btn' onClick={()=>{pageScroll('posts-top')}}>Get Started</button>
            </div>
        </div>
        <div className='blog-posts-container'>
            <br/>
            <h1 id='posts-top'>Our blog posts</h1>
            <div className='blog-cards'>
                 {currentItems.length>0 ? (
                    currentItems.map((item, i)=>(
                   <p key={i}><BlogPostCard element={item}/></p>
                    ))
                    ) :<p className='loading-text'>Loading...  <ClipLoader color={'white'} size={40}/></p> }        
            </div>
            <br/>
            <div className='load-buttons-container'>
            <a href='/blog#/#posts-top' className='load-btn' onClick={()=>{prevPage('posts-top')}} disabled={currentPage === 1}>
               Prev
            </a>
            <a href='/blog#/#posts-top' className='load-btn' onClick={()=>{nextPage('posts-top')}} disabled={currentPage===(maxPages)}>
                   Next
            </a>
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