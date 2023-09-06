import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  create,
  deleteContract,
  getContract,
  getContracts,
  paymentController,
  tokenController,
  update,
  upload,
} from "../controllers/contract.controller.js";
const router = express.Router();

router.post("/", verifyToken, create);
router.get("/all", verifyToken, getContracts);
router.get("/:id", verifyToken, getContract);
router.delete("/:id", verifyToken, deleteContract);
router.put("/:id", verifyToken, update);
router.get("/braintree/token", verifyToken, tokenController);
router.post("/payment/:id", verifyToken, paymentController);
router.post("/upload", verifyToken, upload);
export default router;
