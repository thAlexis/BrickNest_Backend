import connection from "../config/db.config.js";

async function findUserByMail(mail) {
  const SELECT = "SELECT * FROM users WHERE mail = ?";
  try {
    const found = await connection.query(SELECT, mail);
    console.log(found[0]);
    return found[0][0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addNewUser(newUser, hashedPassword) {
  const INSERT = `INSERT INTO users (username, firstname, lastname, mail, password, role) VALUES (?, ?, ?, ?, ?, "user")`;
  try {
    const [result] = await connection.query(INSERT, [
      newUser.username,
      newUser.firstname,
      newUser.lastname,
      newUser.mail,
      hashedPassword,
    ]);
    newUser.id = result.insertId;
    return newUser;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteUser(userId) {
  const DELETE = "DELETE FROM users WHERE id = ?";
  try {
    const result = await connection.query(DELETE, userId);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { findUserByMail, addNewUser, deleteUser };
