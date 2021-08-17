import express from "express";

import activity from "./activity";

const router: express.Router = express.Router();

router.use("/v1/user-activity", activity);

export = router;
