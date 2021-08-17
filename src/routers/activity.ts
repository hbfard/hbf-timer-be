import express from "express";
import { Request, Response } from "express";
import checkApiAccess from "../middlewares/checkApiAccess";

import Activities from "../models/db/Activities";

const router = express.Router();

router.get(
  "/get-items/:mac?/:output?",
  checkApiAccess(),
  async (req: Request, res: Response, next) => {
    const whereClouse: any = {};
    if (req.params.mac) whereClouse.mac = req.params.mac;

    await Activities.find(whereClouse, (error: any, result: any) => {
      if (error) return res.status(500).send(error);

      if (req.params.output === "json") return res.status(200).json(result);

      const calculatedResult = result.length
        ? result.reduce((acc: any, val: any) => {
            return { savedSeconds: acc.savedSeconds + val.savedSeconds };
          })
        : { savedSeconds: 0 };
      res.status(200).send(calculatedResult);
    });
  }
);

router.post(
  "/save",
  checkApiAccess(),
  async (req: Request, res: Response, next) => {
    const data = req.body;

    await Activities.create(data);

    res.status(200).send({ message: "Data has been recorded!" });
  }
);

export default router;
