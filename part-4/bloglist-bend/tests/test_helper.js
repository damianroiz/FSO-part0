const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const loginUser = async () => {
  try {
    const response = await api.post('/api/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    console.log(response.body);
    return response.body;
  } catch (error) {
    console.error('Error loggin in:', error);
  }
};

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
    id: '6638137414af094b0f45d45e',
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
    id: '664010dd377875163745d4c7',
  },
];

const initialUsers = [
  {
    username: 'xerox2',
    name: 'Alexandre',
    blogs: [
      {
        url: 'themodelhealthshow',
        title: 'Eat Smarter',
        author: 'Shawn Stevenson',
        id: '6638137414af094b0f45d45e',
      },
      {
        url: 'midudev',
        title: 'Aprendiendo Git y Github',
        author: 'Miguel Angel Duran',
        id: '664010dd377875163745d4c7',
      },
    ],
    id: '66326855617693436c999c00',
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
  loginUser,
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
