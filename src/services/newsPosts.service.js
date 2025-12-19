import newsPostsRepository from "../repositories/newsPosts.repository.js";

async function createNewPost(title, image, text, author) {
  try {
    const imagePath = `/uploads/${image}`;
    const newPostCreated = await newsPostsRepository.addNewPost(
      title,
      imagePath,
      text,
      author
    );
    return newPostCreated;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { createNewPost };
