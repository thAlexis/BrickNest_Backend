import connection from "../config/db.config.js";

async function addNewPost(title, imagePath, text, author) {
  const INSERT =
    "INSERT INTO news_posts (title, image, content, author, publish_date, update_date) values (?, ?, ?, ?, NOW(), NOW())";
  try {
    const [{ affectedRows }] = await connection.query(INSERT, [
      title,
      imagePath,
      text,
      author,
    ]);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { addNewPost };
