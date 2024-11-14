const express = require("express");
const app = express();
const router = require("./routes/router")
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`your app is running on port ${port}`);
})
