SHOW DATABASES;
SHOW TABLES; -- TO EXECUTE THIS CODE WE FIRST GO TO CLI THEN USE DB WHICH WE WANT TO EXECUTE 
-- this is the fourth way to code or run query of mysql rather than workbench 
-- these code will execute after 'source Schema.sql' in CLI
CREATE TABLE blogData(
    id VARCHAR(200) PRIMARY KEY UNIQUE,
    username VARCHAR(300) UNIQUE,
    email VARCHAR(300) NOT NULL,
    password VARCHAR(220) NOT NULL
);
SHOW TABLES;