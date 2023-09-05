import express from "express";
import {
  deleteUser,
  getUserByName,
  getUsername,
  getUsersByEmail,
  subscribe,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getUserByName);
router.get("/getAll", verifyToken, getUsersByEmail);
router.get("/:id", verifyToken, getUsername);
router.get("/:id", verifyToken, subscribe);
export default router;
