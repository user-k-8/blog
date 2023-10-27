import React from 'react'
import Navbar from './Navbar'
import profileImg  from './img/5.jpg'
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const TestimonialsDetails = () => {
  // const location = useLocation();
  // const {element} = location.state;
  
  return (
    <>
    <div className='view-post-container'>
        <Navbar/>
        <div className='view-post-wrapper'>
            <br/>
            <h1>Hear from a Melsoft Academy Alumnus</h1>
            <h3>Written by : Jane Doe</h3>
            <h3>Date : 6 August 2023</h3>
            <p className='post-content'>  
            <img src={profileImg} alt='' className='view-post-img1'/>
            <br/>
            <span >The integration of DevOps practices has revolutionized the software development lifecycle, streamlining collaboration between development and operations teams and accelerating the delivery of high-quality software products. By fostering a culture of continuous integration and continuous delivery (CI/CD), DevOps enables teams to automate processes, reduce development cycle times, and improve the overall efficiency of software development and deployment.Through the implementation of robust automation tools, such as Jenkins, GitLab, and Docker, DevOps teams can automate build processes, conduct comprehensive testing, and deploy software updates seamlessly. By minimizing manual interventions and optimizing workflows, DevOps practices ensure faster time-to-market, improved product quality, and enhanced customer satisfaction. Moreover, the adoption of DevOps principles fosters a collaborative and agile work environment, promoting cross-functional teamwork, effective communication, and shared responsibilities across development, operations, and quality assurance teams.</span>     
            </p>
        </div>
       <br/><br/>
        <Footer/>
    </div>
   
    </>
  )
}

export default TestimonialsDetails