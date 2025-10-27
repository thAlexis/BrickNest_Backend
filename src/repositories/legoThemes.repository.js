import connection from "../config/db.config.js";

async function selectMainThemes() {
  const SELECT = "SELECT * FROM lego_themes WHERE parent_id = 9999";
  try {
    const mainThemes = await connection.query(SELECT);
    return mainThemes[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getMainThemeIdByName(MainThemeName) {
  const SELECT = "SELECT theme_id FROM lego_themes WHERE theme_name = ?";
  try {
    const mainThemeId = await connection.query(SELECT, MainThemeName);
    return mainThemeId[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { selectMainThemes, getMainThemeIdByName };
