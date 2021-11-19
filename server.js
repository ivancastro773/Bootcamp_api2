const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require("multer");
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const multerConfig = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./bucket");
    },
    filename:function(req,file,cb){
        let idImg = uuidv4().split("-")[0];
        let day = dayjs().format('DD-MM-YYYY')
        cb(null,`${day}.${idImg}.${file.originalname}`);
    }
});

const multerMiddle = multer({storage:multerConfig});

let users = [{email:"ivan@gmail.com",name:"ivan",pass:"1234"},
              {email:"tomas@gmail.com",name:"tomas",pass:"123"},
              {email:"tomas@gmail.com",name:"tomas",pass:"123"},
              {email:"gaston@gmail.com",name:"gaston",pass:"123"},
              {email:"tomas@gmail.com",name:"tomas",pass:"123"}
            ];

app.get("/users", (req, res) => {
    res.send([...users]);
});

app.get("/user/:email", (req, res) => {
    var email = req.params.email;
    var ObjForEmail = users.find(item => item.email==email);
    res.send(ObjForEmail);
});

app.get("/usersEmail/:email",(req,res)=>{
    console.log("entro");
    let email= req.params.email;
    let arrayEmail=email.split(",");
    console.log(arrayEmail);
    let response=[];

    arrayEmail.forEach((email)=>{
        users.forEach((user)=>{
            if(user.email==email){
                response.push(user)
            }
        })
    })
    res.send(response);
})
//Por query
app.get("/user-query", (req, res) => {
    const name = req.query.name;
    const ObjForname = users.filter(item => item.name==name);
    res.send(ObjForname);
});
app.post("/user", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const obj = {
        email: email,
        name: name,
        pass: password
    }
    if(email == ""){
        res.send("el mail esta vacio");
    }else{
        res.send("Usuario creado!");
        users.push(obj);
    }
});
//eliminar
app.delete("/user/deleteForEmail/:email", (req, res) => {
    const email = req.params.email;
    users= users.filter((elemento)=>elemento.email!=email) 

    res.send("Usuario eliminado");
});

app.delete("/user/delete",(req,res)=>{
    let mail= req.query.mail;
    mail.forEach(para=>{   
        users= users.filter((elemento)=>elemento.email!=para) 
    })
    res.send("usuarios eliminado");
});

app.post("/user/update",(req,res)=>{
    let email= req.body.email;
    let name= req.body.name;
    let password= req.body.password;
    let leng=users.length
    for(let i=0;i<leng;i++){
        if(users[i].email==email){
            users[i].name=name;
            users[i].pass=password
        }
    }
    res.send("el usuario fue actualizado");
});

app.post("/registro/usuario",multerMiddle.single("file"),(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const file = req.body.file;
    console.log("entro");
    const obj = {
        email: email,
        name: name,
        pass: password,
        file: file
    }
    if(file == ""){
        res.send("No se cargo la imagen");
    }else{
        users.push(obj);
        res.send("Usuario creado!");
    }
});

app.listen(port, () => {
    console.log("Escuchando en el puerto 3000");
});