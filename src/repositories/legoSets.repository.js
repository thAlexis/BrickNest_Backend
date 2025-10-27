import connection from "../config/db.config.js";

async function getAllSetsByMainThemeId(mainThemeId) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN lego_themes on lego_sets.theme_id = lego_themes.theme_id WHERE parent_id = ?";
  try {
    const legoSets = await connection.query(SELECT, mainThemeId);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { getAllSetsByMainThemeId };
