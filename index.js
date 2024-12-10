const { fakerDE: faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Get connection to MySQL database
const connection = mysql.createConnection({
    host: '127.0.0.1', // localhost
    user: 'root',
    database: 'blog',
    password: 'serveranil'
});

// Correct query to show tables in the database
// inserting data with this query
let q = "INSERT INTO blogData (id,username,email,password) VALUES (?,?,?,?)"; //sql query we pass to connection
//in form of array we insert in values i.e 
const blogData = ["122","anilyadav45@2","mahiyadav42@gmail2.com","76453Anil2"];
//we have to keep change it for insert each time so now we use faker data generator to learn more as we mentioned that id should be unique so while inserting it should be unique to previous one
try {
    connection.query(q, blogData,(err, result) => {
        if (err) throw err; // Handle database error
        console.log(result); // Output the result
        console.log(result.length);
        console.log(result[0]);
    });
} catch (e) {
    console.log("Error occurred: " + e);
}

//stop connection after execution
connection.end();

let GetRandomData = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(), // before version 9.1.0, use userName()
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}
console.log(GetRandomData());