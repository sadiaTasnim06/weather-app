import { Router } from "express";
import { weatherController } from "../composition";

const router = Router();

router.get("/locations", weatherController.searchLocations);
router.get("/weather", weatherController.getWeather);

export const weatherRouter = router;
