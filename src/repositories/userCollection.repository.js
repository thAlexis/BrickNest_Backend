import connection from "../config/db.config.js";

async function addSetToCollec(userId, setNum) {
  const INSERT = `INSERT INTO users_collections (user_id, set_num) VALUES (?, ?)`;
  try {
    const [{ affectedRows }] = await connection.query(INSERT, [userId, setNum]);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { addSetToCollec };
