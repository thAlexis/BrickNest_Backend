import newsPostsService from "../services/newsPosts.service.js";
import newsPostsRepository from "../repositories/newsPosts.repository.js";

async function newPost(req, res, next) {
  try {
    const title = req.body.title;
    const image = req.file.filename;
    const text = req.body.text;
    const author = req.user.username;

    const created = await newsPostsService.createNewPost(
      title,
      image,
      text,
      author
    );

    return created
      ? res.status(201).json({ postId: created })
      : res.status(400).json({ message: "Le post n'a pas pu être créé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getOnePostById(req, res, next) {
  try {
    const postId = req.params.postid;
    const post = await newsPostsRepository.getPostById(postId);
    return res.status(200).json(post[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function getLastTwo(req, res, next) {
  try {
    const lastTwo = await newsPostsRepository.getLastTwo();
    return res.status(200).json(lastTwo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = req.params.postid;
    console.log(postId);
    const deleted = await newsPostsRepository.deleteOneById(postId);
    return deleted
      ? res.status(200).json({ message: "Post supprimé" })
      : res.status(404).json({ message: "Post non trouvé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "erreur serveur" });
  }
}

export default { newPost, getOnePostById, getLastTwo, deletePost };
