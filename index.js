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
try {
    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err; // Handle database error
        console.log(result); // Output the result
    });
} catch (e) {
    console.log("Error occurred: " + e.message);
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