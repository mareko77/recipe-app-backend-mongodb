-- Create the database
/*CREATE DATABASE recipes1;
USE recipes1;*/

-- Create 'users' table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    entries INT DEFAULT 0,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'login' table
CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

-- Create 'recipes' table
CREATE TABLE recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  url_photo TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);





