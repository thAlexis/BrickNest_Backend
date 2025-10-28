import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken)
    return res.status(401).json({ message: "Aucun token d'authentification" });

  const jwtToken = bearerToken.split(" ")[1];

  try {
    const jwtDecoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = jwtDecoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Le token est invalide" });
  }
}

export default function verifyAdmin(req, res, next) {
    if(req.user.role !== "admin") {
        return res.status(403).json({message: "Accès refusé"})
    }
    next();
}