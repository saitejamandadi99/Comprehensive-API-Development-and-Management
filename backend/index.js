const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv')
dotenv.config(); 


const app = express(); 
app.use(express.json())
const PORT = process.env.PORT || 5000; 


app.get('/', (req , res)=>{
    res.send('Application is running in the backend.')
})

app.use((err,req, res, next)=>{
    console.error(err.message);
    res.status(500).send('Internal Server Error') // global error handler middleware. 
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})