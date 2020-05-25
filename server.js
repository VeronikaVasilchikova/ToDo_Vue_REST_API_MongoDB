const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const {uri, port} = require("./config");
const mongoose = require("mongoose");
const taskRouter = require("./routes/task");

app.use(express.json());
app.use(cors());
app.use("/", taskRouter);
app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile((path.resolve(__dirname, "client", "index.html")));
});

const start = async () => {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
      });
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  }
  catch (e) {
      console.log(e);
  }
};

start();