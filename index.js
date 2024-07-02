const express = require("express");
const jokes = require("./data");

const app = express();

const validId = (id) => {
  if (jokes.some((joke) => joke.index === id)) {
    return true;
  }

  return false;
};

app.get("/jokes", (req, res) => {
  const randomJokesIndex = Math.floor(Math.random() * jokes.length);
  return res.status(200).json(jokes[randomJokesIndex]);
});

app.get("/jokes/:id", (req, res) => {
  const { id } = req.params;
  const validIndex = validId(id);
  if (!validIndex) {
    return res.status(404).json({
      success: false,
      message: "Invalid index ",
    });
  }
  return res.status(200).json(jokes.filter((joke) => joke.index == id));
});

const PORT = 8050;

app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});
