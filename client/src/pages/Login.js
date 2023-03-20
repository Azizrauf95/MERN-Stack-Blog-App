 
    import React,{ useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { Box, Typography, TextField, Button } from "@mui/material";
    import axios from "axios";
    import { useDispatch } from "react-redux";
    import { authActions } from "../redux/store";
    import toast from "react-hot-toast";
    const Login = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      //state
      const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
     
      useEffect(() => {
        const id = localStorage.getItem("userId");
        {id ? navigate("/") : navigate("/login");

        }
      }, []);
    
      //handle input change
      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      //form handle
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const {data} = await axios.post("/api/v1/user/login", {
            email: inputs.email,
            password: inputs.password,
          });
          if (data.success ) {
            localStorage.setItem("userId", data?.user._id);
            dispatch(authActions.login());
             toast.success('login successfully')
            navigate("/");
            
             
           
           
          }
        
          
          }
          catch (error) {
             
             
            toast.error('email or password incorrect')
          }
         
      }
      return (
        <>
          <form onSubmit={handleSubmit}>
            <Box
              maxWidth={450}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
              boxShadow="10px 10px 20px #ccc"
              padding={3}
              borderRadius={5}
              border= "solid blue 2px"
            >
              <Typography
                variant="h4"
                sx={{ textTransform: "uppercase" }}
                padding={3}
                textAlign="center"
              >
                Login
              </Typography>
    
              <TextField
                placeholder="email"
                value={inputs.email}
                name="email"
                margin="normal"
                type={"email"}
                required
                onChange={handleChange}
              />
              <TextField
                placeholder="password"
                value={inputs.password}
                name="password"
                margin="normal"
                type={"password"}
                required
                inputProps={{
                  minlength :6,
                  maxlength :12,
                }}
                onChange={handleChange}
              />
    
              <Button
                type="submit"
                sx={{ borderRadius: 3, marginTop: 3 }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate("/register")}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Not a user ? Please Register
              </Button>
            </Box>
          </form>
        </>
      );
    };
    
    export default Login;