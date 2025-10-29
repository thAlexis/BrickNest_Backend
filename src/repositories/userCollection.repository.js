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

async function checkIfAlreadyAdded(userId, setNum) {
  const SELECT =
    "SELECT * FROM users_collections WHERE user_id = ? AND set_num = ?";
  try {
    const alreadyAdded = await connection.query(SELECT, [userId, setNum]);
    console.log(alreadyAdded[0][0]);
    return alreadyAdded[0][0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { addSetToCollec, checkIfAlreadyAdded };
