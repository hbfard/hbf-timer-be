import { Request, Response } from "express";

const checkApiAccess = () => {
  return (req: Request, res: Response, next: any) => {
    const apiKey = req.get("X-API-KEY");

    console.log(apiKey);

    if (!apiKey)
      return res.status(500).send({ message: "API key hasn't provided!" });

    if (apiKey == process.env.API_ACCESS_KEY) {
      next();
    } else {
      return res.status(500).send({ message: "Invalid API key!" });
    }
  };
};

export default checkApiAccess;
