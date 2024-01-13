const express = require("express");
const cors = require("cors");
const app = express();
const Blog = require("./models/Blog");
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => console.log(error));
});

const PORT = process.env.port || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
