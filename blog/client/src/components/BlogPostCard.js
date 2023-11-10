import React from 'react'
import {HashLink as Link} from 'react-router-hash-link';
import { useDispatch } from 'react-redux';

const BlogPostCard = ({element}) => {

  const dispatch = useDispatch()

    const handleSelect=()=>{
      dispatch({ type: 'SELECT_POST', payload: element});
       localStorage.setItem('selectedPost', JSON.stringify(element));
    }
  return (
<div className='destination-card'>
    <div className='card-image'>
           <img src={element.img} alt=''/>
    </div>
    <div className='card-text'>
       <h3>{element.author} - <br/> {element.date}</h3>
        <p className='center'>{element.title}</p>
        <div className='card-btns'>
           <Link to= {{pathname:`/viewpost`, hash: "view-top"}}  state={{element}} onClick={handleSelect}><button className='blog-btn' >Read More</button></Link>  
        </div>
    </div>
</div>
  )
}

export default BlogPostCard