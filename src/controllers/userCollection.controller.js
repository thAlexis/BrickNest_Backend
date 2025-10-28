import userCollectionService from "../services/userCollection.service.js";

async function sendSetToCollection(req, res, next) {
  const userMail = req.user.mail;
  const setNum = req.params.setnum;
  try {
    const setIsAdded = await userCollectionService.sendSetToCollection(
      userMail,
      setNum
    );

    return setIsAdded
      ? res.status(201).json({ message: "Le set à été correctement ajouté" })
      : res.status(400).json({ message: "Le set n'a pas pu être ajouté" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export default { sendSetToCollection };
