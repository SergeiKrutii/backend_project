const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/historyResult/index");
const { addResultSchema } = require("../../models/historyResults");
const { validateBody, isValidToken } = require("../../middlewares");

router.post("/", isValidToken, validateBody(addResultSchema), ctrl.addResult);
router.get("/", isValidToken, ctrl.getResult);

module.exports = router;
