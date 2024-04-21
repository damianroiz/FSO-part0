const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const Author = require("../models/author");

beforeEach(async () => {
  await Author.deleteMany({});

  const authorObjects = helper.initialAuthors.map(
    (author) => new Author(author)
  );
  const promiseArray = authorObjects.map((author) => author.save());
  await Promise.all(promiseArray);
});

/// 4.16
test("a username or password of less than three characters is not added", async () => {
  const wrongUser = {
    username: "S",
    name: "Scott",
    password: "aventure",
  };

  await api
    .post("/api/authors")
    .send(wrongUser)
    .expect(400)
    .expect((res) => console.log(res.body.error))
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/authors");
  assert.strictEqual(response.body.length, helper.initialAuthors.length);
});
