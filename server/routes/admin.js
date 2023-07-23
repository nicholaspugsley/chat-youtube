import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import { currentAdmin } from "../controllers/admin";

router.get("/current-admin", requireSignin, currentAdmin);

module.exports = router;
