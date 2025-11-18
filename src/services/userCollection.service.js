import userCollectionRepository from "../repositories/userCollection.repository.js";
import usersRepository from "../repositories/users.repository.js";
import legoSetsRepository from "../repositories/legoSets.repository.js";

async function sendSetToCollection(userMail, setNum) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const setIsAdded = await userCollectionRepository.addSetToCollec(
      id,
      setNum
    );

    return setIsAdded;
  } catch (err) {
    console.log(err);
  }
}

async function selectAllSetsByUser(userMail) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const allSetsInCollection = await userCollectionRepository.selectAllByUser(
      id
    );

    return allSetsInCollection;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteFromCollection(userMail, setNum) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const isDeleted = await userCollectionRepository.deleteSetFromCollection(
      id,
      setNum
    );

    return isDeleted;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getSetsInCollection(userMail, limit, offset) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const legoSets = await legoSetsRepository.getAllSetsInCollecByUserId(
      id,
      limit,
      offset
    );
    if (!legoSets) return null;

    const total = await userCollectionRepository.getTotalSetsByUser(id);
    const nbPages = Math.ceil(total / limit);

    return [legoSets, total, nbPages];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLastThreeInCollec(userMail) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const legoSets = await legoSetsRepository.getLastThreeCollectedByUserId(id);

    if (!legoSets) return null;

    return legoSets;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  sendSetToCollection,
  selectAllSetsByUser,
  deleteFromCollection,
  getSetsInCollection,
  getLastThreeInCollec,
};
