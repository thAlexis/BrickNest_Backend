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

async function compareUserPassword(loginId) {
  try {
    const user = await usersRepository.findUserByMail(loginId.mail);

    if (!user) {
      return null;
    }

    const rigthPassword = await useBcrypt.verifyPassword(
      loginId.password,
      user.password
    );

    console.log(rigthPassword);

    if (rigthPassword) {
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function compareAndModifyPassword(userData) {
  try {
    const rigthPassword = await compareUserPassword(userData);

    if (!rigthPassword) {
      return null;
    }

    const hashedNewPassword = await useBcrypt.hashPassword(
      userData.newpassword
    );

    const passwordUpdated = await usersRepository.updatePassword(
      userData.mail,
      hashedNewPassword
    );

    return passwordUpdated.affectedRows > 0 ? true : false;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  hashNewUserPassword,
  compareUserPassword,
  compareAndModifyPassword,
};
