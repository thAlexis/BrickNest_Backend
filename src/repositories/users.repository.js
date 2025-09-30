import connection from "../config/db.config.js";

async function findUserByMail(mail) {
  const SELECT = "SELECT * FROM users WHERE mail = ?";
  try {
    const found = await connection.query(SELECT, mail);
    return result[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addNewUser(newUser, hashedPassword) {
  const INSERT = `INSERT INTO users (username, firstname, lastname, mail, password, role) VALUES (?, ?, ?, ?, ?, "user")`;
  try {
    const result = await connection.query(INSERT, [
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

export default { findUserByMail, addNewUser };
