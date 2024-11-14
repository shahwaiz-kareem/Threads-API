const express = require("express");
const router = express.Router()
const User = require("../models/user.model")
const Thread = require("../models/thread.model")

router.get("/", (req, res) => {
  res.send("Welcome to  an amazing Threads Api!")
});

router.get("/user", async (req, res) => {
  try {
    const userData = await User.find();
    res.send(userData)
  } catch (error) {
    res.status(400).send(error)
  }

});

router.post("/user", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.send(userData)
  } catch (error) {
    res.status(400).send(error)
  }
});

router.get("/threads/:pageNumber/:pageSize", async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.params;
    const skipAmount = (pageNumber - 1) * pageSize;
    const threadData = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort("-createdAt")
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: "User" })
      .populate({
        path: "children",
        model: "Thread",
        populate: {
          path: "author",
          model: User,
          select: "username _id parentId"
        }
      })
    res.send(threadData)
  } catch (error) {
    res.status(400).send(error)
  }

});

router.post("/thread", async (req, res) => {
  try {
    const threadData = await Thread.create(req.body);
    await User.findByIdAndUpdate(threadData.author,
      { $push: { threads: threadData._id } });
    if ("parentId" in threadData && threadData.parentId !== null || undefined) {
      await Thread.findByIdAndUpdate(threadData.parentId,
        { $push: { children: threadData._id } });
    }
    res.send(threadData)
  } catch (error) {
    res.status(400).send(error)
  }
});



module.exports = router



