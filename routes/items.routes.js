import { Router } from "express"
import { getItems } from "../controllers/items.controller.js";

const router = Router();

router.get("/items/", getItems);

export default router;