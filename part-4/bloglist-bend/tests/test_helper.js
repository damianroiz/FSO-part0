const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    url: 'themodelhealthshow',
    title: 'Eat Smarter',
    author: 'Shawn Stevenson',
    user: {
      username: 'xerox2',
      name: 'Alexandre',
      id: '66326855617693436c999c00',
    },
    likes: 10,
    id: '664de0130701d40da0d36827',
  },
  {
    url: 'midudev',
    title: 'Aprendiendo Git y Github',
    author: 'Miguel Angel Duran',
    user: {
      username: 'xerox2',
      name: 'Alexandre',
      id: '66326855617693436c999c00',
    },
    likes: 9,
    id: '664de0130701d40da0d36827',
  },
];

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  testUserToken,
  usersInDb,
};
