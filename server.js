const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require("multer");

const app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
//revisar 
app.get("/user/:email1/:email2", (req, res) => {
    var email1 = req.params.email1;
    var email2 = req.params.email2;
    var array = [];
    var ObjForEmail1 = users.find(item => item.email==email1);
    var ObjForEmail2 = users.find(item => item.email==email2);
    array.push(ObjForEmail1,ObjForEmail2);
    res.send(array);
});
//Por query
app.get("/user", (req, res) => {
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
app.delete("/user/:email", (req, res) => {
    const email = req.params.email;
    const userDelete = users.splice(users.indexOf(email),1);
    res.send("Usuario eliminado");
});
app.delete("/user", (req, res) => {
    const email1 = req.query.email1;
    for (let i = 0; i < email1.length; i++) {
        /* if(email1[i]==users.email)  */
    }
    res.send("borrado"); 
});

app.listen(port, () => {
    console.log("Escuchando en el puerto 3000");
});