const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Author = require("../models/author");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end;
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updateBlog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const author = await Author.findById(body.authorId);
  //// there has to be an issue within these lines
  console.log(body.authorId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: author._id,
  });

  if (!author || !body.url) {
    return response.status(400).send({ error: "missing data" });
  }

  const savedBlog = await blog.save();
  author.blogs = author.blogs.concat(savedBlog._id);
  await author.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
