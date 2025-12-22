import usersRepository from "../repositories/users.repository.js";
import useBcrypt from "../config/bcrypt.config.js";
import jwt from "jsonwebtoken";

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

async function newTokenUpdated(newAccountInfos, mail, role) {
  try {
    const accountModified = await usersRepository.updateUser(
      newAccountInfos,
      mail
    );

    if (accountModified) {
      const payload = {
        username: newAccountInfos.username,
        mail: newAccountInfos.mail,
        firstname: newAccountInfos.firstname,
        lastname: newAccountInfos.lastname,
        role: role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      return token;
    }
    return null;
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

    if (rigthPassword) {
      const payload = {
        username: user.username,
        mail: user.mail,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      return token;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function compareAndModifyPassword(password, newPassword, mail) {
  try {
    const user = await usersRepository.findUserByMail(mail);

    if (!user) {
      return null;
    }

    const rigthPassword = await useBcrypt.verifyPassword(
      password,
      user.password
    );

    if (!rigthPassword) {
      return null;
    }

    const hashedNewPassword = await useBcrypt.hashPassword(newPassword);

    const passwordUpdated = await usersRepository.updatePassword(
      mail,
      hashedNewPassword
    );

    return passwordUpdated;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  hashNewUserPassword,
  compareUserPassword,
  compareAndModifyPassword,
  newTokenUpdated,
};
