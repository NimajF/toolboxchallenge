import { Router } from "express";
const router = Router();

import * as controller from "../controllers/fileController.js";

router.route("/files/data").get(controller.getData);
router.route("/files/list").get(controller.getFilesList);

export default router;
