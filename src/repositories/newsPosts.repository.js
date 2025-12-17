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

export default { addNewPost, getPostById };
