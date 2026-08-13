import { Router } from "express";
import { weatherController } from "../composition";

const router = Router();

router.get("/locations", weatherController.searchLocations);

export const weatherRouter = router;
