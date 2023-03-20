 
   import React, { useState, useEffect } from "react";
   import axios from "axios";
   import { useNavigate } from "react-router-dom";
   import BlogCard from "../components/BlogCard";
   import toast from "react-hot-toast";
   const UserBlogs = () => {
    const navigate = useNavigate();
     const [blogss, setBlogs] = useState([]);
   
     //get user blogs
     const getUserBlogs = async () => {
       try {
         const id = localStorage.getItem("userId");
         const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
         if (data?.success) {
           setBlogs(data?.userBlog);
         }
       } catch (error) {
        toast.error("error while getting blogs");
       }
     };
     
     useEffect(() => {
       getUserBlogs();
       const id = localStorage.getItem("userId");
       {id ? navigate("/my-blogs") : navigate("/login");
   
       }
     }, []);
     
     return (
       <div>
       
         {blogss?.blogs   &&
           blogss?.blogs?.map((blog) => (
             <BlogCard
               id={blog._id}
               isUser={true}
               title={blog.title}
               description={blog.description}
               image={blog.image}
               username={blogss.username}
               time={blog.createdAt}
             />
           ))
           }
           {blogss?.blogs?.length < 1 ? <h1>You Havent Created a blog</h1>: null}
       </div>
     );
   };
   
   export default UserBlogs;