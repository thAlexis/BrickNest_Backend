import connection from "../config/db.config.js";

async function selectMainThemes() {
  const SELECT = "SELECT * FROM lego_themes WHERE parent_id = 0";
  try {
    const mainThemes = await connection.query(SELECT);
    return mainThemes[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { selectMainThemes };
