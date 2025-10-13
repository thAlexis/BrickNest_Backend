import legoThemesRepository from "../repositories/legoThemes.repository.js";

////////////////// SELECT MAIN THEMES ////////////////
async function getMainThemes(req, res, next) {
  try {
    const mainThemes = await legoThemesRepository.selectMainThemes();
    return mainThemes
      ? res.status(200).json({ mainThemes })
      : res.status(400).json({ message: "Aucun thème trouvé" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Erreur serveur" });
  }
}

export default { getMainThemes };
