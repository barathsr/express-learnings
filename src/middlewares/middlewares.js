import express from 'express'

const app = express()

app.use(logger)

app.get('/', (req, res) =>{
    console.log('Home')
})


app.get('/login', auth, (req, res) =>{
    console.log('login end point')

})

function logger(req, res, next){
    console.log(req.originalUrl)
    req.logger = {"hi" : "barath"}
    return next();
}

function auth(req, res, next){
    console.log(req.logger);
    console.log('login')
    if(req.query.id === "true"){
        res.json({message : "successfully logged in, welcome to the page"})
        return next()
    }
    return res.json({message : "Unable to login"})
    
}

app.listen(8000)

//RegEx
//