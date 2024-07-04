const express = require("express");
const jokes = require("./data");
const images = require("./images");
const cors = require("cors");

const app = express();

app.use(cors());

const validId = (id) => {
  if (jokes.some((joke) => joke.index === id)) {
    return true;
  }

  return false;
};

app.get("/joke/random", (req, res) => {
  const randomJokesIndex = Math.floor(Math.random() * jokes.length);
  const randomImages = Math.floor(Math.random() * images.length);
  return res.status(200).json({
    joke: jokes[randomJokesIndex].joke,
    image: images[randomImages].url,
  });
});

app.get("/jokes", (req, res) => {
  return res.status(200).json(jokes);
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
