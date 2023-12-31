import React from 'react'
import Navbar from './Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useState
} from "react"; 
const EditPost = () => {
 
   const location = useLocation();
   const {element} = location.state;

    const navigate = useNavigate()
    const [form, setForm] = useState( {
      author: element.author,
      date: element.date,
      post: element.post, 
      title: element.title,
      email: element.email,
      id:element.id,
      user_comments: ""
   
  }); 
  
  const handleInputChange = event=>{
  
  const {name, value, type, checked} = event.target
  setForm({...form, [name]:  value})
  }
  
  const navigateAndRefresh = (path) =>{

    navigate(path);
    window.location.reload();
  }
  
  const handleSubmit = async (e)=>{
     e.preventDefault();
   
     fetch('https://blog-fzhg.onrender.com/posts/api/editpost', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
      //  response data from the server
      console.log(data)
    
    })
    .catch(error => {
      console.error('Error:', error);
    });

     
  alert('Blog post updated!');
  navigateAndRefresh('/')
  
  }
  
return (
      <div className='create-post-container' id='edit-top'>
           <div>
              <Navbar/>
          </div>
          <div className='post-form-container'>
                <h1>Edit your blog post</h1>
  
                <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
               <label htmlFor="author">Full Name <span className="star">*</span></label>
               <br/><br/>
               <input type="text" id="author" name="author" value={form.author}  onChange={handleInputChange} className='post-input' required/>     
            </div>      
          </div>
          <div className="date form-row">
               <label htmlFor="date">Date <span className="star">*</span></label>
               <br/><br/>
               <input type="text" id="date" name="date" value={form.date} onChange={handleInputChange} className='post-input' required/>       
            </div>
            <div className="userName form-row">
               <label htmlFor="title">Blog Title <span className="star">*</span></label>
               <input type="text" id="title" name="title" value={form.title} onChange={handleInputChange} className='post-input' required/>       
            </div>
            <div className="post form-row">
               <label htmlFor="post">Blog Post <span className="star">*</span></label>
               <br/><br/>
               <textarea type="text" id="post" name="post" value={form.post} className='blog-post-input' onChange={handleInputChange} required/>
            </div>
            <br/>
            <input type="submit" value="Submit" className='blog-btn'/>
          
         </form>
  
          </div>
      </div>
    
  )
}

export default EditPost