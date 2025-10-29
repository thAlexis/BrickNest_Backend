import userCollectionRepository from "../repositories/userCollection.repository.js";
import usersRepository from "../repositories/users.repository.js";

async function sendSetToCollection(userMail, setNum) {
  try {
    const { id } = await usersRepository.findUserByMail(userMail);

    if (!id) return null;

    const alreadyAdedd = await userCollectionRepository.checkIfAlreadyAdded(
      id,
      setNum
    );

    if (alreadyAdedd) return null;

    const setIsAdded = await userCollectionRepository.addSetToCollec(
      id,
      setNum
    );

    return setIsAdded;
  } catch (err) {
    console.log(err);
  }
}

export default { sendSetToCollection };
