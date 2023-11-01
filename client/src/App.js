import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Blog from "./components/Blog";
import ViewPost from "./components/ViewPost";
import TestimonialDetails from "./components/TestimonialDetails";
import AddPost from "./components/AddPost";
import Login from "./components/Login";
import Register from "./components/Register"
import EditPost from "./components/EditPost";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
        <>
          <BrowserRouter>
               <Routes>
                  
                  <Route exact path="/blog" element={<Blog/>}/>
                  <Route exact path ="/view" element={<ViewPost/>}/>
                  <Route exact path = "/testimonial-details" element={<TestimonialDetails/>} />
                  <Route exact path = "/addpost" element={<AddPost/>} />
                  <Route exact path = "/login" element={<Login/>} />
                  <Route exact path = "/register" element={<Register/>} />
                  <Route exact path = "/editpost" element={<EditPost/>} />
               </Routes>       
          </BrowserRouter>
        </>
  )
}

export default App;
