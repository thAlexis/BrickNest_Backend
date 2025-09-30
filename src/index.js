///////////// Configuration imports //////////////
import express from "express";
import "dotenv/config";
import cors from "cors";
import connection from "./config/db.config.js";

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

////////// Local Host Configuration //////////
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Adresse serveur : http://localhost:${PORT}`);
});
