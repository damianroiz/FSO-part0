const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

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

after(async () => {
  await mongoose.connection.close();
});
