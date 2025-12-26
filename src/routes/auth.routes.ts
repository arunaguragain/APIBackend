import {Router} from "express";
import { AuthController } from "../controllers/user.controller";

let authController  = new AuthController();
const router = Router();

router.post('/register', authController.register);

export default router;