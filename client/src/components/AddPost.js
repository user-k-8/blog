import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username : user.username,
      author,
      title,
      content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/blog");
    } catch (err) {}
  };

  return (
    <div className="create-post-container">
      <div className="create-post-hero">
        <Navbar />
        <div className="create-post-hero-text">
          <h1>
            Share your <br /> insights
          </h1>
          <h3>
            write a blog post
            <br /> about fascinating tech
          </h3>

          <button className="hero-btn create-post-hero-btn">
            Start writing
          </button>
        </div>
      </div>
      <div className="post-form-container">
        <h1>Create a blog post</h1>
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="author">
                Full Name <span className="star">*</span>
              </label>
              <br />
              <br />
              <input
                type="text"
                id="author"
                name="author"
                className="post-input"
                required
                onChange={e=>setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="userName form-row">
            <label htmlFor="title">
              Blog Title <span className="star">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="post-input"
              autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
              required
            />
          </div>
          <div className="post form-row">
            <label htmlFor="post">
              Blog Post <span className="star">*</span>
            </label>
            <br />
            <br />
            <textarea
              type="text"
              id="post"
              name="post"
              className="blog-post-input"
              onChange={e=>setContent(e.target.value)}
            />
          </div>
          <br />
          <input type="submit" value="Submit" className="blog-btn" />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
