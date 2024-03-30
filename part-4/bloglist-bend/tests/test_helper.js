const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "An owesome title",
    author: "An awesome author",
    url: "awesomeurl",
    likes: 1,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
