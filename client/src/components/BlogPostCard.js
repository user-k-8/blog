import React from 'react'
import africa from './img/africa.jpg';
import {HashLink as Link} from 'react-router-hash-link';
import { useDispatch } from 'react-redux';

const BlogPostCard = ({element}) => {

  const dispatch = useDispatch()


    const handleSelect=()=>{
      dispatch({ type: 'SELECT_POST', payload: element});
    }
  return (
    <div className='destination-card'>
    <div className='card-image'>
           <img src={element.image} alt=''/>
    </div>
    <div className='card-text'>
       <h3>{element.author} - <br/> {element.updatedAt}</h3>
       <p className='center'>{element.content}</p>
       <div className='card-btns'>
           <Link to= {{pathname:`/view` }}  state={{element}} onClick={handleSelect}><button className='blog-btn'>Read More</button></Link>
          
       </div>
    </div>
   

</div>
  )
}

export default BlogPostCard