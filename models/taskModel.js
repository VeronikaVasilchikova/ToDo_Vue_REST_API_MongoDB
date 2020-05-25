const {Schema, model} = require("mongoose");

const task = new Schema({
  text: {
    type: String,
    required: true
  },
  isCompleted: Boolean,
  isEditing: Boolean
});

module.exports = model("tasks", task);