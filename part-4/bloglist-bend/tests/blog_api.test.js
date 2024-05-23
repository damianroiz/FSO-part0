const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

// reinitiate the database to allow tests to run on consistent data

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const blogArray = blogObject.map((blog) => blog.save());
  await Promise.all(blogArray);
});

//4.23
test('a blog is created successfully', async () => {
  const newBlog = {
    url: 'howtoberich',
    title: 'How to be rich',
    author: 'A rich Author',
    likes: 9,
  };

  const token = await testUserToken();
  console.log("here is the error ", token);

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((b) => b.title);
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
});

// test('return the number of blogs', async () => {
//   const response = await api.get('/api/blogs');
//   assert(response.body.length, 1);
// });

// test('the id property exists', async () => {
//   const response = await api.get('/api/blogs');
//   response.body.forEach((blog) => {
//     assert(blog.id);
//   });
// });

// test('a blog with no likes shows 0 likes', async () => {
//   const unpopularBlog = {
//     title: 'A title with not likes',
//     author: 'An Author nobody likes',
//     url: 'unpopularblog',
//   };

//   if (!unpopularBlog.likes) {
//     unpopularBlog.likes = 0;
//   }

//   await api
//     .post('/api/blogs')
//     .send(unpopularBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const response = await api.get('/api/blogs');
//   response.body.forEach((blog) => {
//     assert(unpopularBlog.likes === 0);
//   });
// });

// test('a test with missing data is not added', async () => {
//   const incompleteBlog = {
//     title: 'An incomplete blog',
//   };

//   const response = await api.get('/api/blogs');
//   assert.strictEqual(response.body.length, helper.initialBlogs.length);
// });

// after(async () => {
//   await mongoose.connection.close();
// });

// test('succeds with status code 204 if Id is valid', async () => {
//   const blogsAtStart = await helper.blogsInDb();
//   const blogtoDelete = blogsAtStart[0];

//   await api.delete(`/api/blogs/${blogtoDelete.id}`).expect(204);

//   const blogsAtEnd = await helper.blogsInDb();
// });

// test('An individual blog post can be updated', async () => {
//   const blogsAtStart = await helper.blogsInDb();
//   let blogToModify = blogsAtStart[0];
//   blogToModify.likes = 35;

//   const resultBlog = await api
//     .put(`/api/blogs/${blogToModify.id}`)
//     .send(blogToModify)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   const blogsAtEnd = await helper.blogsInDb();
//   const modifiedBlog = blogsAtEnd.find((blog) => blog.id === blogToModify.id);
//   console.log(blogsAtEnd);
//   assert.strictEqual(blogToModify.likes, modifiedBlog.likes);
// });
