import Navbar from './Navbar'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Comments from './Comments';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import img1 from './img/c.jpg'
import img2 from './img/a.jpg'

const ViewPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation();
  const {element} = location.state;


  const arr = element.post.split('.');
  const firsthalfIndex= arr.length/2
  const section1 = arr.slice(0,firsthalfIndex).join('.')
   const section2= arr.slice(firsthalfIndex,arr.length).join('.');

   const storedUser= JSON.parse(localStorage.getItem("blogLogin"));

   const navigateAndRefresh = (path) =>{

    navigate(path);
    window.location.reload();
  }

  const handleDelete =()=>{

    try {
      console.log(element)
      const response =  fetch('https://blog-fzhg.onrender.com/posts/api/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(element),
      });
      console.log('data deleted');
  
    } catch (error) {
      // Handle any errors
      console.error('Error deleting data:', error);
    }
    dispatch({ type: 'DELETE_POST', payload: element.post});
    alert('Blog post deleted!');
    navigate('/')

}
  return (
    
    <div className='view-post-container'  id='view-top'>
        <Navbar/>
        <div className='view-post-wrapper'>
            <h1>{element.title}</h1>
            <h3>Written by : {element.author}</h3>
            <h3>Date : {element.date}</h3>
            <div className='edit-btns' style={{display: storedUser ? storedUser.userEmail == element.email ? "flex" : "none":"none" }}>
           <Link to="/editpost" state={{element}}> <button className='blog-btn' >Edit </button></Link>
            <br/>
           <button className='blog-btn delete-btn'  onClick={handleDelete}>Delete</button>
       </div>
            <p className='post-content'>  
            <img src={img1} alt='' className='view-post-img1'/>
            <span >{section1}</span>     
            </p>
            <p className='post-content'>  
            
           
            <img src={img2} alt='' className='view-post-img2'/>
            <span >{section2}</span>    
            </p>
           
        </div>
        <br/>
        <div className='view-post-comments'>
        <Comments item={element}/>
        </div>
        <Footer/>
    </div>
   
    
  )
}

export default ViewPost