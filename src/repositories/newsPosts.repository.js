import connection from "../config/db.config.js";

async function addNewPost(title, imagePath, text, author) {
  const INSERT =
    "INSERT INTO news_posts (title, image, content, author, publish_date, update_date) values (?, ?, ?, ?, NOW(), NOW())";
  try {
    const [{ insertId }] = await connection.query(INSERT, [
      title,
      imagePath,
      text,
      author,
    ]);
    return insertId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getPostById(postId) {
  const SELECT = "SELECT * FROM news_posts WHERE id = ?";
  try {
    const [result] = await connection.query(SELECT, postId);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLastTwo() {
  const SELECT = "SELECT * FROM news_posts ORDER BY publish_date DESC LIMIT 2";
  try {
    const [rows] = await connection.query(SELECT);
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteOneById(postId) {
  const DELETE = "DELETE FROM news_posts WHERE id = ?";
  try {
    const [{ affectedRows }] = await connection.query(DELETE, postId);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { addNewPost, getPostById, getLastTwo, deleteOneById };
