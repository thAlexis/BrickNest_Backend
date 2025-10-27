import legoSetsService from "../services/legoSets.service.js";

async function allSetsByMainTheme(req, res, next) {
  const mainThemeName = req.params.maintheme;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  try {
    const [legoSets, total, nbPages] =
      await legoSetsService.getAllSetsByMainTheme(mainThemeName, limit, offset);

    res
      .status(200)
      .json({ page, nbPages: nbPages, totalSets: total, sets: legoSets });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export default { allSetsByMainTheme };
