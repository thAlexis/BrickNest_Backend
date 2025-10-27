import legoSetsService from "../services/legoSets.service.js";

async function allSetsByMainTheme(req, res, next) {
  const mainThemeName = req.params.maintheme;
  try {
    const legoSets = await legoSetsService.getAllSetsByMainTheme(mainThemeName);
    return !legoSets
      ? res.status(400).json({ message: "Aucun set Lego trouvé" })
      : res.status(200).json(legoSets);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export default { allSetsByMainTheme };
