const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const testUserToken = async () => {
  const testUser = {
    username: 'testUser',
    name: 'John Testing',
    password: 'testPassword',
  };

  await api.post('/api/users').send(testUser);
  const loginDetails = await api.post('/api/login').send(testUser);
  return loginDetails.body.token;
};


const initialBlogs = [
  {
    url: 'themodelhealthshow',
    title: 'Eat Smarter',
    author: 'Shawn Stevenson',
    likes: 10,
    id: '6653c3f5a51287bb5644ebd6',
  },
  {
    url: 'midudev',
    title: 'Aprendiendo Git y Github',
    author: 'Miguel Angel Duran',
    likes: 9,
    id: '6653c3f5a51287bb5644ebd7',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  testUserToken,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
