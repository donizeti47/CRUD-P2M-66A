import jwt from "jsonwebtoken";


// função que valida se existe um token passado na requisição;
// após verificar se o token é existente, utilizando jwt.verify validamos que é um token válido com base na secret que temos no arquivo .env;
export default function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}