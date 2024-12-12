const { fakerDE: faker, da } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();


//body parser for holding template newuser data 

const bodyParser = require("body-parser");
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get connection to MySQL database
const connection = mysql.createConnection({
    host: '127.0.0.1', // localhost
    user: 'root',
    database: 'blog',
    password: 'serveranil'
});
//setting ejs path for views
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


//to generate random data 
//to access data we changed value-pair to array
let GetRandomData = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
    ];//for arr we only keep value not key
}
let data = [];
for (let i = 0; i <= 100; i++) {
    data.push(GetRandomData());
}

//routes 
//home route - to show no.of users in db
app.get("/", (req, res) => {

    //query to show only no.of user in db
    let q1 = "SELECT count(*) FROM blogData"; //while home route it pass query to sql as we connection with sql
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err; // Handle database error
            // console.log(result[0]["count(*)"]); // Output the result
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    } catch (e) {
        res.send("some error in DB");
    }

})

//to get new user data  with data.ejs template
app.get("/newUser",(req,res)=>{
   res.render("newUser.ejs");

})
//post req for holding the data and pass to sql database
app.post("/",(req,res)=>{
    let N_User = [[req.body.id,req.body.username,req.body.email,req.body.password]];
    console.log(N_User);
    //to pass into sql DB
  let q2 = "INSERT INTO blogData (id,username,email,password) VALUES ? ";
    try {
            connection.query(q2, [N_User], (err, result) => {
                if (err) throw err; // Handle database error
                console.log(result); // Output the result
                res.redirect("/");
            });
        } catch (e) {
            res.send("some error in sql query");
        }
    
    
})

//show route - to see all users
app.get("/users",(req,res)=>{
  

    let q3 = "SELECT * FROM blogData";
    try {
            connection.query(q3, (err, users) => {
                if (err) throw err; // Handle database error
                console.log(users); // Output the result
                res.render("showusers.ejs",{users});
            });
        } catch (e) {
            res.send("some error in sql query");
        }
    

})

//route to edit username
app.get("/users/:id/edit",(req,res)=>{

    let {id} = req.params;
    let q4 = `SELECT * FROM blogData WHERE id='${id}'`;
    console.log(id);
    try {
            connection.query(q4, (err, users) => {
                if (err) throw err; // Handle database error
                let {id} = req.params;
                console.log(id);
                res.render("edit.ejs",{users});
            });
        } catch (e) {
            res.send("some error in sql query");
        }

})
app.post("/users/:id",(req,res)=>{
    
})
// console.log(data);
// Correct query to show tables in the database
// inserting data with this query
//in form of array we insert in values i.e 
// const blogData = [["125", "anilyadav45@5", "mahiyadav42@gmail5.com", "76453Anil5"], ["126", "anilyadav45@6", "mahiyadav42@gmail6.com", "76453Anil6"]];

//we have to keep change it for insert each time so now we use faker data generator to learn more as we mentioned that id should be unique so while inserting it should be unique to previous one
// let q = "INSERT INTO blogData (id,username,email,password) VALUES ?"; //sql query we pass to connection
// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err; // Handle database error
//         console.log(result); // Output the result
//         // console.log(result.length);
//         // console.log(result[0]);
//     });
// } catch (e) {
//     console.log("Error occurred: " + e);
// }

//stop connection after execution
// connection.end();
app.listen("8080", (req, res) => {
    console.log("app is listening on port : 8080");
})

