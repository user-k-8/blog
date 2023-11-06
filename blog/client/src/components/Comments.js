import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux'

const Comments = (props) => {

  const [selected, setSelected] = useState(JSON.parse(localStorage.getItem("selectedPost")))
 console.log(selected)

  const storedUser = JSON.parse(localStorage.getItem("blogLogin"));

  const [form, setForm] = useState( {
    name: storedUser? storedUser.userEmail :"",
   comment:"",
  email: storedUser? storedUser.userEmail :""
}); 

const [commentForm, setCommentForm] =useState({commentButton:"Add Comment", formDisplay:"none"})
const [load, setLoad] =React.useState(false)

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}

const handleSubmit = (event)=>{

event.preventDefault();

let newPost =  JSON.parse(localStorage.getItem("selectedPost"));
console.log(newPost)
if(newPost){
  newPost.user_comments = [form, ...newPost.user_comments] 
}
else{
  newPost.user_comments = [form]
}

fetch('https://blog-fzhg.onrender.com/comments/api/addComment', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newPost)
})
.then(response => response.json())
.then(data => {
  //  response data from the server
  let selectedPost = data.filter(item=>item.post == props.item.post)
  localStorage.setItem('selectedPost', JSON.stringify(selectedPost[0]));
  setSelected(selectedPost[0])

})
.catch(error => {
  console.error('Error:', error);
});

alert('Comment added!');
setCommentForm({commentButton:"Add Comment", formDisplay:"none"})
}

const selectedPost=  JSON.parse(localStorage.getItem("selectedPost"));
if(!selectedPost){
  return <div>Loading</div>
}

const handleDelete =(element)=>{


  
  let newPost =  selected;
  const commentIndex = selected.user_comments.indexOf(element)
  console.log('index', commentIndex);
  newPost.user_comments = newPost.user_comments.filter(item=> item != newPost.user_comments[commentIndex])

  fetch('https://blog-fzhg.onrender.com/comments/api/deleteComment', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  })
  .then(response => response.json())
  .then(data => {

    let selectedPost = data.filter(item=>item.post == props.item.post)
    localStorage.setItem('selectedPost', JSON.stringify(selectedPost[0]));
    setSelected(selectedPost[0])
  
  })
  .catch(error => {
    console.error('Error:', error);
  });

  alert('Comment deleted!');
  setLoad(prev=> !prev)
}

const handleComment = ()=>{
 
  if(storedUser){
         if(commentForm.commentButton=="Add Comment"){
            setCommentForm({commentButton:"Close", formDisplay:"flex"})
            }
         else{
            setCommentForm({commentButton:"Add Comment", formDisplay:"none"})
           }
 }else{
          alert("You must be logged in to comment!")
  }


}

  return (
    <div className='comments-container grey'>
       <h1>Comments</h1>
       <button className='blog-btn' onClick={handleComment}>{commentForm.commentButton}</button>
       <br/><br/>
       <div className='comment-form' style={{display: commentForm.formDisplay}}>
       <div onSubmit={handleSubmit}>
        
        <div className="comment form-row">
             <label htmlFor="comment">Comment <span className="star">*</span></label><br/>
             <textarea type="text" id="comment" name="comment" value={form.post} onChange={handleInputChange} required className='comment-input'/>
          </div>
          <br/>
          <button onClick={handleSubmit} className='blog-btn' >Submit</button>
        </div>
       </div>
       {selected.user_comments?
      selected.user_comments.map((element)=>(
        <div className='comment-wrapper'>
              <h3>{element.name}</h3>
              <p>{element.comment}</p>
              <button className='blog-btn'  style={{display: storedUser ? storedUser.userEmail == element.email ? "flex" : "none":"none" }}  onClick={()=>{handleDelete(element)}}>Delete</button>
        </div>
      )) :
      <p className='grey'>No comments</p>
      }
    </div>
  )
}


const mapStateToProps = (state)=>{
  return{
    selected_post: state.selected_post
  }
}

export default connect(mapStateToProps)(Comments)