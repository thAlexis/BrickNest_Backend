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

async function selectAllByUser(userId) {
  const SELECT = "SELECT set_num FROM users_collections WHERE user_id = ?";
  try {
    const setsInCollection = await connection.query(SELECT, userId);
    return setsInCollection[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteSetFromCollection(userID, setNum) {
  const DELETE =
    "DELETE FROM users_collections WHERE user_id = ? AND set_num = ?";
  try {
    const [{ affectedRows }] = await connection.query(DELETE, [userID, setNum]);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTotalSetsByUser(userId) {
  const SELECT =
    "SELECT COUNT(*) AS total FROM users_collections WHERE user_id = ?";
  try {
    const [[{ total }]] = await connection.query(SELECT, userId);
    return total;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  addSetToCollec,
  selectAllByUser,
  deleteSetFromCollection,
  getTotalSetsByUser,
};
