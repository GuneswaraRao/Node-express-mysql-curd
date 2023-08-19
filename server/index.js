const express = require("express");

const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const cors = require("cors")

app.use(cors());

const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "mydb",
    database : "nodecurd"
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended :true}));


app.get("/api/get",(req,res)=>{
  const sqlGet = "SELECT * FROM curd_operations";
  db.query(sqlGet,(error, result)=>{
        res.send(result);
  });
});

app.post("/api/post",(req,res)=>{
    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO curd_operations (name, email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error, result)=>{
        if(error){
            console.log(error)
        }
          res.send(result);
    });
  });

  app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    const sqldelete = "DELETE FROM curd_operations WHERE id = ?";
    db.query(sqldelete,id,(error, result)=>{
        if(error){
            console.log(error)
        }
          res.send(result);
    });
  });

  app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sql = "SELECT * FROM curd_operations WHERE id = ?";
    db.query(sql,id,(error, result)=>{
        if(error){
            console.log(error)
        }
          res.send(result);
    });
  });

  app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE curd_operations SET name=?,email=?,contact=? WHERE id = ?";
    db.query(sqlUpdate,[name,email,contact,id],(error, result)=>{
        if(error){
            console.log(error)
        }
          res.send(result);
    });
  });

app.get("/",(req,res)=>{
    // const sqlInsert = "INSERT INTO curd_operations (name, email,contact) VALUES ('guna1','guna1@gmail.com',9394955435)";
    // db.query(sqlInsert,(error, result)=>{
    //     console.log("error", error);
    //     console.log("result",result);
    //     res.send("Hello Node Express")
    // })
  
})

app.listen(5000,()=>{
    console.log("server connected")
})