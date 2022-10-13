const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getAllGoals,
} = require("../controllers/goalController.js");

// router.route("/").get(protect, getGoals).post(protect, setGoal);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);
router.route("/allGoals").get(getAllGoals);

module.exports = router;
