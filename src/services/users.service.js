import usersRepository from "../repositories/users.repository.js";
import useBcrypt from "../config/bcrypt.config.js";

async function hashNewUserPassword(newUser) {
  try {
    const hashedPassword = await useBcrypt.hashPassword(newUser.password);
    const addedUser = await usersRepository.addNewUser(newUser, hashedPassword);
    return addedUser;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { hashNewUserPassword };
