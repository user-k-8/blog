// import React from 'react';
// import comments from '../data/comments';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {connect} from 'react-redux';

// const Comment = ({element}) => {
//     const dispatch = useDispatch()
//     const handleDelete =()=>{
//         dispatch({ type: 'DELETE_COMMENT', payload: element});
//     }
//   return (
//     <div className='comment-wrapper'>
//     <h3>{element.name}</h3>
//     <p>{element.comment}</p>
//     <button className='blog-btn' style={{display: element.display}} onClick={handleDelete}>Delete</button>
// </div>
//   )
// }

// export default Comment