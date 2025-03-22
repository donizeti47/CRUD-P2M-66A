import express from "express";
import { register, login, updateUser, getUsers, getUser, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// rota /update utiliza o authMiddleware para fazer a validação do token antes de permitir que o usuário siga com a edição;
router.put("/update", authMiddleware, updateUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;