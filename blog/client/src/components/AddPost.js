import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import {useState} from "react"; 

const AddPost = () => {

  const storedUser= JSON.parse(localStorage.getItem("blogLogin"));
 const navigate = useNavigate()
  const [form, setForm] = useState( {
    author:"",
   date:"",
    post:"", 
   title:"",
   email: storedUser.userEmail
 
}); 

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}

const navigateAndRefresh = (path) =>{

  navigate(path);
  window.location.reload();
}

const handleSubmit = (e)=>{
   e.preventDefault();
 
   fetch('https://blog-fzhg.onrender.com/posts/api/upload', {
  method: 'POST',
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


alert('Blog post created!');
navigateAndRefresh('/')

}

const pageScroll=(id)=>{
  const element = document.getElementById(id);
  if (element) {
 element.scrollIntoView({
   behavior: "smooth",
   block: "start",
 });
}}

console.log(form)

  return (
    <div className='create-post-container' id='create-top'>
         <div className='create-post-hero'>
            <Navbar/>
            <div className='create-post-hero-text'>
                <h1>Share your <br/> insights</h1>
                <h3>write a blog post<br/> about fascinating tech</h3>
              
                 <button onClick={()=>{pageScroll('create-posts-top')}} className='hero-btn create-post-hero-btn'>Start writing</button>
            </div>
        </div>
        <div className='post-form-container'  id='createPost'>
              <h1 id='create-posts-top'>Create a blog post</h1>

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

export default AddPost