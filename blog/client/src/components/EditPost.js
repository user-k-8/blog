import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import {
  useState
} from "react"; 
const EditPost = () => {
 
    const navigate = useNavigate()
    const [form, setForm] = useState( {
      author:"",
     date:"",
      post:"", 
     title:"",
     email:""
   
  }); 
  
 
  const handleInputChange = event=>{
  
  const {name, value, type, checked} = event.target
  setForm({...form, [name]:  value})
  }
  
  
  const handleSubmit = async (e)=>{
     e.preventDefault();
   
  
  alert('Blog post created!');
  navigate('/blog')
  console.log(form)
  
  }
  
  console.log(form)
  
    return (
      <div className='create-post-container'>
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
          <div className="form-row">
              <div>
               <label htmlFor="email">Account email <span className="star">*</span></label>
               <br/><br/>
               <input type="email" id="email" name="email" value={form.email}  onChange={handleInputChange} className='post-input' required/>     
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
               <textarea type="text" id="post" name="post" value={form.post} className='blog-post-input' onChange={handleInputChange} />
            </div>
            <br/>
            <input type="submit" value="Submit" className='blog-btn'/>
          
         </form>
  
          </div>
      </div>
    
  )
}

export default EditPost
