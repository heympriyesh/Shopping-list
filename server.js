const express =require('express');
const mongoose=require('mongoose');
const items=require('./routes/api/items')
const app=express();
app.use(express.json());


//DB Config
const db=require('./config/keys').mongoURI;

//connect to Mongo
mongoose
    .connect(db,{useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true})
    .then(()=>{console.log('MongoDB Connected...!');})
    .catch(err=>{
        console.log(err)
    })

//use Rotues
app.use('/api/items',items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`)
})