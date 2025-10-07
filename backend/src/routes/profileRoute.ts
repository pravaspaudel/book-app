import { Router } from "express";
import { getProfile } from "../controllers/profileController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();

router.get("/profile", verifyToken, getProfile);

export default router;
