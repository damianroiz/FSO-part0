const bcrypt = require("bcryptjs");
const authorsRouter = require("express").Router();
const Author = require("../models/author");

////// 4.15 completed
authorsRouter.get("/", async (request, response) => {
  const authors = await Author.find({});
  response.json(authors);
});

authorsRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const author = new Author({
    username,
    name,
    passwordHash,
  });

  const savedAuthor = await author.save();

  response.status(201).json(savedAuthor);
});

module.exports = authorsRouter;
