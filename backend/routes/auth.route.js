import { Router } from "express";
import { getAllBorrowers, login, logout, register } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { isLibrarian } from "../middlewares/isLibrarian.js";
import { upload } from "../utils/mutler.js";

const router = Router();

router.post('/register',upload.single('profilePic'),register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/allBorrowers',checkAuth,isLibrarian,getAllBorrowers);

export default router;