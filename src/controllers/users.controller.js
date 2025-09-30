import usersRepository from "../repositories/users.repository.js";
import usersService from "../services/users.service.js";

/////////////////// INSCRIPTION ////////////////////////
async function registerUser(req, res, next) {
  const newUser = req.body;

  try {
    ///// check if mail is already registered ///
    const alreadyExists = await usersRepository.findUserByMail(newUser.mail);
    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Utilisateur déjà existant" });
    }

    /////// register new user /////
    const addedUser = await usersService.hashNewUserPassword(newUser);
    console.log(addedUser);
    return res.status(200).json({
      success: true,
      message: "Inscription réussie",
      id: addedUser.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

///////////////////// AUTHENTIFICATION /////////////////////
async function loginUser(req, res, next) {
  const loginId = req.body;

  try {
    const userConnected = await usersService.compareUserPassword(loginId);

    return userConnected
      ? res.status(200).json({
          success: true,
          message: "Connexion réussie",
          id: userConnected.id,
          username: userConnected.username,
          mail: userConnected.mail,
          firstname: userConnected.firstname,
          lastname: userConnected.lastname,
        })
      : res
          .status(400)
          .json({ success: false, message: "Identifiants incorrects" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

///////////////// SUPPRESSION DE COMPTE ////////////////
async function deleteAccount(req, res, next) {
  const userId = req.params.id;
  try {
    const deleted = await usersRepository.deleteUser(userId);
    return deleted.affectedRows > 0
      ? res
          .status(200)
          .json({ success: true, message: "Le compte a été supprimé" })
      : res.status(400).json({
          success: false,
          message: "Le compte ciblé n'a pas été supprimé",
        });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

export default { registerUser, loginUser, deleteAccount };
