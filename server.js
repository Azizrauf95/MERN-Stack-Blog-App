const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const fileURLToPath = require('url')
//env config
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection 
connectDB();


//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))
 //routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
//port
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode with port no ${PORT}.`.bgCyan.white);
});
