import userWishlistRepository from "../repositories/userWishlist.repository.js";
import usersRepository from "../repositories/users.repository.js";
import legoSetsRepository from "../repositories/legoSets.repository.js";

async function sendSetToWishlist(userMail, setNum) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const setIsAdded = await userWishlistRepository.addSetToWishlist(
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

    const allSetsInCollection = await userWishlistRepository.selectAllByUser(
      id
    );

    return allSetsInCollection;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteFromWishlist(userMail, setNum) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const isDeleted = await userWishlistRepository.deleteSetFromWishlist(
      id,
      setNum
    );

    return isDeleted;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getSetsInWishlist(userMail, limit, offset) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const legoSets = await legoSetsRepository.getAllSetsInWishlistByUserId(
      id,
      limit,
      offset
    );
    if (!legoSets) return null;

    const total = await userWishlistRepository.getTotalSetsByUser(id);
    const nbPages = Math.ceil(total / limit);

    return [legoSets, total, nbPages];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  sendSetToWishlist,
  selectAllSetsByUser,
  deleteFromWishlist,
  getSetsInWishlist,
};
