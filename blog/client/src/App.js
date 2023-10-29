import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Blog from "./components/Blog";

import ViewPost from "./components/ViewPost";
import TestimonialDetails from "./components/TestimonialDetails";
function App() {
  return (
        <>
          <BrowserRouter>
               <Routes>
                  
                  <Route exact path="/blog" element={<Blog/>}/>
                  <Route exact path ="/viewpost" element={<ViewPost/>}/>
                  <Route exact path = "/testimonial-details" element={<TestimonialDetails/>} />
               </Routes>       
          </BrowserRouter>
        </>
  )
}

export default App;
