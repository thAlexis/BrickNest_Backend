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

async function getAllSetsNumInUserCollection(req, res, next) {
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

async function getAllSetsByUser(req, res, next) {
  const userMail = req.user.mail;
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    const [legoSets, total, nbPages] =
      await userCollectionService.getSetsInCollection(userMail, limit, offset);

    console.log(legoSets);
    return legoSets
      ? res.status(200).json({
          page: page,
          nbPages: nbPages,
          totalSets: total,
          sets: legoSets,
        })
      : res.status(404).json({ message: "Aucun set trouvé" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getLastThree(req, res, next) {
  const userMail = req.user.mail;

  try {
    const lastThreeSets = await userCollectionService.getLastThreeInCollec(
      userMail
    );

    return lastThreeSets
      ? res.status(200).json(lastThreeSets)
      : res.status(404).json({ message: "Aucun set trouvé" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export default {
  sendSetToCollection,
  getAllSetsNumInUserCollection,
  deleteSetFromCollection,
  getAllSetsByUser,
  getLastThree,
};
