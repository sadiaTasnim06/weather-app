import { Router } from "express";
import { weatherController } from "../composition";

const router = Router();

router.get("/locations", (req, res) => {
  return weatherController.searchLocations(req, res);
});

export const weatherRouter = router;
