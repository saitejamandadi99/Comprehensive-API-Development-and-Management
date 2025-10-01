const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv')
dotenv.config(); 


const app = express(); 
app.use(express.json())
const PORT = process.env.PORT || 5000; 
const MONGO_URL = process.env.MONGO_URL;

//database connection 
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err.message);
})


app.get('/', (req , res)=>{
    res.send('Application is running in the backend.')
})
app.use('/api/auth', require('./routes/authRoutes'));  
app.use('/api/users', require('./routes/userControllers'))

app.use((err,req, res, next)=>{
    console.error(err.message);
    res.status(500).send('Internal Server Error') // global error handler middleware. 
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})