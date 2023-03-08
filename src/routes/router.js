import { Router } from 'express';
import  schema  from '../models/schemas.js'

const router = Router();

router.get('/', (req, res) => {
    console.log('connected to server');
    res.status(200).json({'Message':'WELCOME to the server'});
})

//search all
router.get('/search', async(req, res) => {
    try{
        const resp = await schema.find()
        if(resp==undefined||resp==null)
        return res.status(404).json({message:"Our data base is empty. Please insert any data."})
        else
        return res.status(200).json({resp})
    }
     catch(err){
        console.log('Error:'+err.message) 
        return res.status(500).json({ message: "Internal server error. Please try again later." })
     }
})

//search by query params
router.get('/search/query', async(req, res) => {
    const {name,age} = req.query 
    try{
       const resp = await schema.find({name,age}).exec();
       if(!resp){
        return res.status(404).json({message:"Not matching our records"})
       }
       return res.status(200).json(resp)
    }
    catch(err){
        console.log('Error:'+err.message) 
        return res.status(500).json({ message: "Internal server error. Please try again later." })
    }
})


//search by id as path params
router.get('/search/:id', async(req, res) => {
    try{
        const {id} = req.params
        console.log(id)
        const resp = await schema.findById(id)
        if(!resp){
        return res.status(404).json({message:"Not matching our records"})
        }
        const{_id} = resp
        return res.status(200).json({_id})
        
     }
     catch(err){
        console.log('Error:'+err.message)
        return res.status(500).json({ message: "Internal server error. Please try again later." })
     }
})

//Insert into db
router.post('/insert', async (req, res) => {
    const { name, age, color } = req.body;
    const d1 = new schema({ name, age, color })
    
    try {
       const a1 = await d1.save()
       const {_id} = a1;
       return res.status(201).json({_id})
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server error. Please try again later." })
    }
//     d1.save().then((response) => {
//         const {_id} = response;
//         res.status(201).json({ id : _id})
//     }).catch((err) => {
//         console.log(err.message);
//          res.status(500).json({ message: "Internal server error. Please try again later." })
//     });
})

//Patch Update
router.patch('/update/:id', async(req, res) => {
    try{
        const update = req.body
        const {id} = req.params
        const u1 = await schema.findByIdAndUpdate(id,update,{returnDocument:"after", strict:false})
        return res.status(200).json(u1)
    }
    catch(err){
        console.log('Error:'+err.message) 
        return res.status(500).json({ message: "Internal server error. Please try again later." })
    }
})

//Put update 
router.put('/update/put/:id', async(req, res)=> {
    try {
        const {name,age,color} = req.body
        const {id} = req.params
        const u1 = await schema.findById(id)
        u1.color = color
        const a1 = await u1.save()
        const {_id} = a1
        return res.status(200).json({_id})

    } catch (err) {
        console.log('Error:'+err.message) 
        return res.status(500).json({ message: "Internal server error. Please try again later." })
    }
})


//Delete document
router.delete('/delete/:id', async(req,res) =>{
    try{
        const {id} = req.params
        const doc1 = await schema.findById(id)
        const del = await doc1.deleteOne()
        const {_id} = del
        return res.status(200).json({message : "deleted successfully"})
    }
     catch(err){
        console.log('Error:'+err.message) 
        return res.status(500).json({ message: "Internal server error. Please try again later." })
    }
})

export default router

