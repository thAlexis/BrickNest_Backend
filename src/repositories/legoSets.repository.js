import connection from "../config/db.config.js";

async function getSetsByMainThemeId(mainThemeName, limit, offset) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN lego_themes on lego_sets.theme_id = lego_themes.theme_id WHERE theme_name = ? LIMIT ? OFFSET ?";
  try {
    const legoSets = await connection.query(SELECT, [
      mainThemeName,
      limit,
      offset,
    ]);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTotalSetsByTheme(mainThemeName) {
  const SELECT =
    "SELECT COUNT(*) AS total FROM lego_sets JOIN lego_themes on lego_sets.theme_id = lego_themes.theme_id WHERE theme_name = ?";
  try {
    const [[{ total }]] = await connection.query(SELECT, mainThemeName);
    return total;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllSetsInCollecByUserId(userId, limit, offset) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN users_collections on lego_sets.set_num = users_collections.set_num WHERE user_id = ? LIMIT ? OFFSET ?";
  try {
    const legoSets = await connection.query(SELECT, [userId, limit, offset]);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllSetsInWishlistByUserId(userId, limit, offset) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN users_fav on lego_sets.set_num = users_fav.set_num WHERE user_id = ? LIMIT ? OFFSET ?";
  try {
    const legoSets = await connection.query(SELECT, [userId, limit, offset]);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLastThreeCollectedByUserId(userId) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN users_collections on lego_sets.set_num = users_collections.set_num WHERE user_id = ? ORDER BY users_collections.add_date DESC LIMIT 3";
  try {
    const legoSets = await connection.query(SELECT, userId);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLastFiveWishlistedByUserId(userId) {
  const SELECT =
    "SELECT * FROM lego_sets JOIN users_fav on lego_sets.set_num = users_fav.set_num WHERE user_id = ? ORDER BY users_fav.add_date DESC LIMIT 3";
  try {
    const legoSets = await connection.query(SELECT, userId);
    return legoSets[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default {
  getSetsByMainThemeId,
  getTotalSetsByTheme,
  getAllSetsInCollecByUserId,
  getAllSetsInWishlistByUserId,
  getLastThreeCollectedByUserId,
  getLastFiveWishlistedByUserId,
};
