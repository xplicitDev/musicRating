import { Router } from "express";
import getImageByTitle from "../controllers/image.controller.js";

const router = Router();

router.route("/getImageByTitle").get(getImageByTitle);

export default router;
