const {Router} = require("express");
const router = Router();
const Tasks = require("../models/taskModel");

router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find();
		res.send(tasks);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

router.post("/api/tasks", async (req, res) => {
  const tasks = new Tasks({...req.body});
  try {
    tasks.save();
    res.send(tasks);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

router.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Tasks.deleteOne({_id: req.params.id});
    res.status(200).send({message: "The task was removed"});
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

router.put("/api/tasks/:id", async (req, res) => {
  try {
    await Tasks.findByIdAndUpdate(req.params.id, req.body);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

module.exports = router;