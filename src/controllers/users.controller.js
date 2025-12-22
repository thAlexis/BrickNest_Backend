import usersRepository from "../repositories/users.repository.js";
import usersService from "../services/users.service.js";

/////////////////// INSCRIPTION ////////////////////////
async function registerUser(req, res, next) {
  const newUser = req.body;

  try {
    ///// check if mail is already registered ///
    const alreadyExists = await usersRepository.findUserByMail(newUser.mail);
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Cette adresse mail est déjà utilisée",
      });
    }

    /////// register new user /////
    const addedUser = await usersService.hashNewUserPassword(newUser);
    console.log(addedUser);
    return res.status(200).json({
      success: true,
      message: "Inscription réussie",
      id: addedUser.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

///////////////////// AUTHENTIFICATION /////////////////////
async function loginUser(req, res, next) {
  const loginId = req.body;
  console.log(`ID de connexion : ${loginId}`);

  try {
    const userToken = await usersService.compareUserPassword(loginId);

    return userToken
      ? res.status(200).json({
          success: true,
          message: "Connexion réussie",
          userToken,
        })
      : res
          .status(400)
          .json({ success: false, message: "Identifiants incorrects" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

///////////////// SUPPRESSION DE COMPTE ////////////////
async function deleteAccount(req, res, next) {
  const mail = req.user.mail;
  try {
    const deleted = await usersRepository.deleteUser(mail);
    return deleted
      ? res
          .status(200)
          .json({ success: true, message: "Le compte a été supprimé" })
      : res.status(400).json({
          success: false,
          message: "Le compte ciblé n'a pas été supprimé",
        });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

//////////////// MODIF PASSWORD SI ANCIEN PASSWORD EST OK ///////////
async function modifyPassword(req, res, next) {
  const password = req.body.password;
  const newPassword = req.body.newpassword;
  const mail = req.user.mail;
  try {
    const passwordModified = await usersService.compareAndModifyPassword(
      password,
      newPassword,
      mail
    );

    return passwordModified
      ? res
          .status(200)
          .json({ success: true, message: "Mot de passe modifié avec succès" })
      : res
          .status(400)
          .json({ success: false, message: "Mot de passe incorrect" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ succes: false, message: "Erreur serveur" });
  }
}

//////////////// MODIF INFOS COMPTE //////////////////
async function modifyAccount(req, res, next) {
  const newAccountInfos = req.body;
  const mail = req.user.mail;
  const role = req.user.role;
  // newAccountInfos.newmail =
  //   newAccountInfos.newmail == ""
  //     ? newAccountInfos.mail
  //     : newAccountInfos.newmail;

  try {
    const newToken = await usersService.newTokenUpdated(
      newAccountInfos,
      mail,
      role
    );

    return newToken
      ? res.status(200).json({
          success: true,
          message: "Informations modifiées avec succès",
          newToken: newToken,
        })
      : res
          .status(400)
          .json({ success: false, message: "Modification refusée" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

export default {
  registerUser,
  loginUser,
  deleteAccount,
  modifyPassword,
  modifyAccount,
};
