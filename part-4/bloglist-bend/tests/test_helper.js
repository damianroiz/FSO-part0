const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "An owesome title",
    author: "An awesome author",
    url: "awesomeurl",
    likes: 1,
  },
];

module.exports = {
  initialBlogs,
};
