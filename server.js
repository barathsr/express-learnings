import express from 'express'
import dotenv from 'dotenv'
import mongodb from 'mongodb'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import router from './src/routes/router.js'


const app = express()
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected')
})
// mongoose.connect(process.env.MONGO_URI {
//     useNewUrlParser : true, useUnifiedTopology : true
// }, (err) => {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('successfully connected to Database!')
//     }
// });

// const con = mongoose.connection
// con.on('open', () => {
//     console.log('connected')
// })
 

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text({ extended: true }));
app.use('/demo', router);

//Routes/End points
// app.post('/insert', async(req,res) => {
//     try{
//         const d1 = new blogSchema({
//             name : 'barath',
//             age : 21,
//             color : 'green'
//         });
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.get('/search', async(req, res) => {
//     try{
//         const data = await schema.find() 
//         res.json(data)
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.get('/login', (req,res) => {
//     const id = req.query.userid;
//     const pwd= req.query.userpwd;
//     console.log(id,pwd);
//     res.status(200).send();
// })


//End
const listener = app.listen(process.env.Port||8000, () => {
    console.log('Server is listening on Port : '+listener.address().port)
});

