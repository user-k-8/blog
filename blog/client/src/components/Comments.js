import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
const Comments = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = React.useState( {
    name:"",
   comment:"",
   display:"block"
 
}); 

const [commentForm, setCommentForm] =React.useState({commentButton:"Add Comment", formDisplay:"none"})

const [load, setLoad] =React.useState(false)

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}


const handleSubmit =event=>{
event.preventDefault()
dispatch({ type:  'ADD_COMMENT', payload: form});
alert('A comment was submited:'+form.name);
setCommentForm({commentButton:"Add Comment", formDisplay:"none"})
console.log(form)

}

const handleDelete =(element)=>{
  dispatch({ type: 'DELETE_COMMENT', payload: element});
  setLoad(prev=> !prev)
}

const handleComment = ()=>{
 
  if(commentForm.commentButton=="Add Comment"){
  setCommentForm({commentButton:"Close", formDisplay:"flex"})

  }
  else{
    setCommentForm({commentButton:"Add Comment", formDisplay:"none"})
  }
}

  
  return (
    <div className='comments-container grey'>
       <h1>Comments</h1>
       <button className='blog-btn' onClick={handleComment}>{commentForm.commentButton}</button>
       <br/><br/>
       <div className='comment-form' style={{display: commentForm.formDisplay}}>
       <form onSubmit={handleSubmit}>
          <div className="name-container form-row">
            <div>
             <label htmlFor="name">Full Name <span className="star">*</span></label>
             <input type="text" id="name" name="name" value={form.name}  onChange={handleInputChange}  required className='comment-input'/>     
          </div>      
        </div>
        <div className="comment form-row">
             <label htmlFor="comment">Comment <span className="star">*</span></label><br/>
             <textarea type="text" id="comment" name="comment" value={form.post} onChange={handleInputChange} required className='comment-input'/>
          </div>
          <br/>
          <input type="submit" value="submit" />
        </form>

       </div>
      {props.selected_post.user_comments?
      props.selected_post.user_comments.map((element)=>(
        <div className='comment-wrapper'>
              <h3>{element.name}</h3>
              <p>{element.comment}</p>
              <button className='blog-btn' style={{display: element.display}} onClick={()=>{handleDelete(element)}}>Delete</button>
        </div>
      )):
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