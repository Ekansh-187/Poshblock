import express from "express";
// import { verifyToken } from "../middleware/jwt.js";
import {
  getPending,
  getAll,
  setUploaded,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/archive", getAll);
router.get("/", getPending);
router.put("/", setUploaded);
export default router;
