DROP DATABASE IF EXISTS brickNest_db;
CREATE DATABASE brickNest_db;
USE brickNest_DB;

CREATE TABLE lego_themes (
  theme_id INT PRIMARY KEY,
  theme_name VARCHAR(128),
  parent_id INT
);

CREATE TABLE lego_sets (
  set_num VARCHAR(30) PRIMARY KEY,
  set_name VARCHAR(300),
  set_year INT, 
  theme_id INT,
  FOREIGN KEY (theme_id) REFERENCES lego_themes(theme_id),
  parts_num INT,
  img_link VARCHAR(300)
);

LOAD DATA LOCAL INFILE '/Users/alexisthullier/Desktop/BrickNest/sets.csv'
INTO TABLE lego_sets
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';


LOAD DATA LOCAL INFILE '/Users/alexisthullier/Desktop/BrickNest/themes.csv'
INTO TABLE lego_themes
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30),
  email VARCHAR(128),
  password VARCHAR(128),
  role VARCHAR(20)
);

CREATE TABLE users_fav (
  user_id INT, 
  set_num VARCHAR(30), 
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (set_num) REFERENCES lego_sets(set_num)
)

CREATE TABLE users_collections (
  user_id INT,
  set_num VARCHAR(30),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (set_num) REFERENCES lego_sets(set_num)
)

CREATE TABLE news_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  image VARCHAR(300),
  content MEDIUMTEXT, 
  author_id INT,
  publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
)