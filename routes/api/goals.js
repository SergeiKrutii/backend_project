const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/goals/index");
const { addGoalsSchema } = require("../../models");
const { validateBody, isValidToken } = require("../../middlewares");

router.post("/", isValidToken, validateBody(addGoalsSchema), ctrl.addGoal);
router.get("/", isValidToken, ctrl.getGoal);
router.patch("/:goalId", isValidToken, ctrl.achievedGoal);

module.exports = router;
