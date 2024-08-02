import express from "express";
import { register, login, deleteUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/:email", deleteUser);

export default router;
