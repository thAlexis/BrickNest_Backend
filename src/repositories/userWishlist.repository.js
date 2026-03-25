import connection from "../config/db.config.js";

async function addSetToWishlist(userId, setNum) {
  const INSERT = `INSERT INTO users_fav (user_id, set_num) VALUES (?, ?)`;
  try {
    const [{ affectedRows }] = await connection.query(INSERT, [userId, setNum]);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function selectAllByUser(userId) {
  const SELECT = "SELECT set_num FROM users_fav WHERE user_id = ?";
  try {
    const setsInWishlist = await connection.query(SELECT, userId);
    return setsInWishlist[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteSetFromWishlist(userID, setNum) {
  const DELETE = "DELETE FROM users_fav WHERE user_id = ? AND set_num = ?";
  try {
    const [{ affectedRows }] = await connection.query(DELETE, [userID, setNum]);
    return affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTotalSetsByUser(userId) {
  const SELECT = "SELECT COUNT(*) AS total FROM users_fav WHERE user_id = ?";
  try {
    const [[{ total }]] = await connection.query(SELECT, userId);
    return total;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  addSetToWishlist,
  selectAllByUser,
  deleteSetFromWishlist,
  getTotalSetsByUser,
};
