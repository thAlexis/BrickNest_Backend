import legoSetsRepository from "../repositories/legoSets.repository.js";
import legoThemesRepository from "../repositories/legoThemes.repository.js";

async function getAllSetsByMainTheme(mainThemeName) {
  try {
    const mainThemeId = await legoThemesRepository.getMainThemeIdByName(
      mainThemeName
    );
    if (!mainThemeId) return null;
    const legoSets = await legoSetsRepository.getAllSetsByMainThemeId(
      mainThemeId
    );
    if (!legoSets) return null;
    return legoSets;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { getAllSetsByMainTheme };
