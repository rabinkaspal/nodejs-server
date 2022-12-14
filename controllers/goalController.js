const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

//@desc     Get all goals
//@route    GET /api/goals/allGoals
//@access   Private
const getAllGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

//@desc     Get goals
//@route    GET /api/goals
//@access   Private
const getGoals = asyncHandler(async (req, res) => {
    console.log("LOG: ", req.body.user.id);

    const goals = await Goal.find({ user: req.body.user.id });
    res.status(200).json(goals);
});

//@desc     Get goals
//@route    POST /api/goals
//@access   Private
const setGoal = asyncHandler(async (req, res) => {
    console.log("LOG: ", req.body);
    if (!req.body.text) {
        res.status(400);
        throw new Error("Goal text is required");
    }
    const goal = await Goal.create({
        user: req.body.user.id,
        text: req.body.text,
    });

    res.status(200).json(goal);
});

//@desc     Get goals
//@route    PUT /api/goals
//@access   Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    if (!req.body.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedGoal);
});

//@desc     Get goals
//@route    DELETE /api/goals
//@access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    goal.remove();

    res.status(200).json({
        id: req.params.id,
        message: `Delete goal *${goal.text}*`,
    });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getAllGoals,
};
