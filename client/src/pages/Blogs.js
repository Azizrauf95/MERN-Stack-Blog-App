import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      toast.error("error while getting blogs");
    }
  };
  useEffect(() => {
    getAllBlogs();
    const id = localStorage.getItem("userId");
    {id ? navigate("/") : navigate("/login");

    }
  }, []);
  return (
    <div xs={10} md={8} lg={6}>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;