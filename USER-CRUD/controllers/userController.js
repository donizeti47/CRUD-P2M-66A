import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// função de criação de usuário;
// utilizando o bcrypt.hash para encriptar a senha antes de salvar no banco de dados;
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// função de fazer o login na aplicação;
// utilizando o bcrypt.compare desencriptar a senha do usuário e comparar com a senha enviada pela requisição;
// utilizando o jwt.sign para gerar um token JWT com o ID do usuário que expira em 1hora;
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// função que faz o edit de um usuário;
// o ID do usuário é capturado no token JWT enviado na requisição;
export async function updateUser(req, res) {
  try {
    const { id } = req.user;
    const { username, email } = req.body;
    await User.update({ username, email }, { where: { id } });
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// função que retorna TODOS os usuários cadastrados no banco de dados;
export async function getUsers(_, res) {
  const users = await User.findAll();
  res.json(users);
}

// função que retorna um usuário a partir de um ID passado na URL da requisição;
export async function getUser(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

// função para deletar um usuário a partir de um ID passado na URL da requisição;
export async function deleteUser(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  await user.destroy();
  res.json({ message: "User deleted" });
}