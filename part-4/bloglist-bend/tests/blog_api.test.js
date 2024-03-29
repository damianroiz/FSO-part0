const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const Blog = require("../models/blog");

// reinitiate the database to allow tests to run on consistent data

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

/// 4.8
test("return the number of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert(response.body.length, 1);
});

//4.9
test("the id property exists", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert(blog.id);
  });
});

//4.10
test("a blog is created successfully", async () => {
  const newBlog = {
    title: "The Art of Power",
    author: "Thich Nhat Hanh",
    url: "awesomebooks.com",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((b) => b.title);
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
});

after(async () => {
  await mongoose.connection.close();
});
