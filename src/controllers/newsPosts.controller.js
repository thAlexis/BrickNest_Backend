import newsPostsService from "../services/newsPosts.service.js";

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
      ? res.status(201).json({ message: "Post publié" })
      : res.status(400).json({ message: "Le post n'a pas pu être créé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export default { newPost };
