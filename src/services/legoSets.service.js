import legoSetsRepository from "../repositories/legoSets.repository.js";

async function getAllSetsByMainTheme(mainThemeName, limit, offset) {
  try {
    const legoSets = await legoSetsRepository.getSetsByMainThemeId(
      mainThemeName,
      limit,
      offset
    );
    if (!legoSets) return null;

    const total = await legoSetsRepository.getTotalSetsByTheme(mainThemeName);
    const nbPages = Math.ceil(total / limit);

    return [legoSets, total, nbPages];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { getAllSetsByMainTheme };
