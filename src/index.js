///////////// Configuration imports //////////////
import express from "express";
import "dotenv/config";
import cors from "cors";
import connection from "./config/db.config.js";

/////////// Routes imports ////////////////
import registerRouter from "./routes/register.route.js";
import loginRouter from "./routes/login.route.js";
import deleteRouter from "./routes/deleteAccount.route.js";
import accountModificationRouter from "./routes/accountModification.route.js";
import themesRouter from "./routes/themes.route.js";
import setsRouter from "./routes/legoSets.route.js";
import userCollectionRouter from "../src/routes/userCollection.route.js";
import userWishlistRouter from "../src/routes/userWishlist.route.js";
import newsPostsRouter from "../src/routes/newsposts.route.js";

/////////// Configuration //////////////
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  }),
);

/////////// Use Routes ////////////
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/deleteaccount", deleteRouter);
app.use("/accountmodification", accountModificationRouter);
app.use("/themes", themesRouter);
app.use("/sets", setsRouter);
app.use("/collection", userCollectionRouter);
app.use("/wishlist", userWishlistRouter);
app.use("/newsposts", newsPostsRouter);

////////// Local Host Configuration //////////
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Adresse serveur : http://localhost:${PORT}`);
});
