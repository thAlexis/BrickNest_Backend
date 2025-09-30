import usersRepository from "../repositories/users.repository.js";
import usersService from "../services/users.service.js";

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

export default { registerUser };
