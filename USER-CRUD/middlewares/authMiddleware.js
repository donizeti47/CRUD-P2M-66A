// import jwt from "jsonwebtoken";


// // função que valida se existe um token passado na requisição;
// // após verificar se o token é existente, utilizando jwt.verify validamos que é um token válido com base na secret que temos no arquivo .env;
// export default function authMiddleware(req, res, next) {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });
//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// }


const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;