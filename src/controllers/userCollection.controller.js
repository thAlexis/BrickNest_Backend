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
      : res.status(400).json({ message: "Le set n'a pas pus être ajouté" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getAllSetsInUserCollection(req, res, next) {
  const userMail = req.user.mail;
  try {
    const allSets = await userCollectionService.selectAllSetsByUser(userMail);

    return allSets
      ? res.status(200).json(allSets)
      : res.status(404).json({ message: "Aucun set trouvé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function deleteSetFromCollection(req, res, next) {
  const userMail = req.user.mail;
  const setNum = req.params.setnum;
  try {
    const isDeleted = await userCollectionService.deleteFromCollection(
      userMail,
      setNum
    );

    return isDeleted
      ? res.status(200).json({ message: "Set supprimé de la collection" })
      : res.statut(404).json({ message: "Le set n'a pas été trouvé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export default {
  sendSetToCollection,
  getAllSetsInUserCollection,
  deleteSetFromCollection,
};
