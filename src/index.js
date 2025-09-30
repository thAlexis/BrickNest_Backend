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

/////////// Configuration //////////////
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  })
);

/////////// Use Routes ////////////
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/deleteaccount", deleteRouter);
app.use("/accountmodification", accountModificationRouter);

////////// Local Host Configuration //////////
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Adresse serveur : http://localhost:${PORT}`);
});
