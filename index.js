import express from "express"
import path from "path"
import {MongoClient} from "mongodb"
import {requestTime, logger} from "./midlewaers.js";
import serverRoutes from "./routes/servers.js"


const __dirname = path.resolve()
const PORT = 3000;
const app = express()

app.set('view engine' , 'ejs');
app.set('views' , path.resolve(__dirname,'ejs'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(requestTime)

app.use(serverRoutes)

app.get('/',(req,res)=>{
    res.render("main", {title:"main page", active: "main"})
})

app.get('/content',(req,res)=>{
    res.render("content",{title:"content page", active: "content"} )
})


app.listen(PORT, ()=>{
    console.log(`server start on port ${PORT}...`)
})

