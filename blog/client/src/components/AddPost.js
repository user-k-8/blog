import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import {
  useState
} from "react"; 

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

const [selectedFiles1, setSelectedFiles1] = useState(null);
const [selectedFiles2, setSelectedFiles2] = useState(null);

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}


const handleSubmit = (e)=>{
   e.preventDefault();
  const fullFormData = new FormData();
  for (let key in form) {
      fullFormData.append(key, form[key]);
  }
 if(selectedFiles1){
  fullFormData.append('images', selectedFiles1)
 }
 if(selectedFiles2){
  fullFormData.append('images', selectedFiles2)
 }
  try {
    const response =  fetch('http://localhost:4000/posts/api/upload', {
      method: 'POST',
      body: fullFormData,
    });
  
  } catch (error) {
    console.error('Error:', error);
  }

alert('Blog post created!');
navigate('/')
console.log(form)

}

console.log(form)

  return (
    <div className='create-post-container'>
         <div className='create-post-hero'>
            <Navbar/>
            <div className='create-post-hero-text'>
                <h1>Share your <br/> insights</h1>
                <h3>write a blog post<br/> about fascinating tech</h3>
              
               <button className='hero-btn create-post-hero-btn'>Start writing</button>
            </div>
        </div>
        <div className='post-form-container'>
              <h1>Create a blog post</h1>

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
          <div className='form-row'>
                 <label htmlFor='blog_img1'>Upload Image 1 <span className="star">*</span></label>
                 <br/><br/>
                <input  type='file' name='images' id='blog_img1' placeholder='Upload Image' onChange={(e) => setSelectedFiles1(e.target.files[0])} className='post-input' required/>
            </div>   
            <div className='form-row'>
                 <label htmlFor='blog_img2'>Upload Image 2 <span className="star">*</span></label>
                 <br/><br/>
                <input  type='file' name='images' id='blog_img2' placeholder='Upload Image' onChange={(e) => setSelectedFiles2(e.target.files[0])} className='post-input' required/>
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

export default AddPost