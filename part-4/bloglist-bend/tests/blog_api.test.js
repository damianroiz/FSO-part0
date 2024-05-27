const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const Blog = require('../models/blog');
const helper = require('./test_helper');

// reinitiate the database to allow tests to run on consistent data

beforeEach(async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
    const blogArray = blogObject.map((blog) => blog.save());
    await Promise.all(blogArray);
  } catch (error) {
    console.log('this is the error ', error);
  }
});

describe('when there are initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    console.log('the content body is this ', response.body);
    assert(response.body.length === 2);
  });

  test('the id property exists', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      assert(blog.id);
    });
  });
});

describe('Addition of new blogs', () => {
  let token;

  beforeEach(async () => {
    return (token = await helper.testUserToken());
  });

  //4.23
  test('a blog is created successfully', async () => {
    const newBlog = {
      url: 'howtoberich',
      title: 'How to be rich',
      author: 'A rich Author',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd, helper.initialBlogs.length + 1);
  });

  // 4.23
  test('a fails with status code 401 when token is not provided', async () => {
    const newBlog = {
      url: 'howtoberich',
      title: 'How to be rich',
      author: 'A rich Author',
      user: '6651e2ff3abdf7806515fe83',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd, helper.initialBlogs.length);
  });

  test('creating a blog with no likes shows 0 likes', async () => {
    const unpopularBlog = {
      title: 'A title with not likes',
      author: 'An Author nobody likes',
      url: 'unpopularblog',
    };

    if (!unpopularBlog.likes) {
      unpopularBlog.likes = 0;
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(unpopularBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      assert(blog.likes === 0);
    });
  });

  test('a blog with missing data is not added', async () => {
    const blogsAtStart = await api.get('/api/blogs');
    const incompleteBlog = {
      title: 'An incomplete blog',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(incompleteBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});

describe('Updating a new blog', () => {
  let token;

  beforeEach(async () => {
    return (token = await helper.testUserToken());
  });

  test('An individual blog post can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    let blogToModify = blogsAtStart[0];
    blogToModify.likes = 35;

    const token = await helper.testUserToken();

    const resultBlog = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blogToModify)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const modifiedBlog = blogsAtEnd.find((blog) => blog.id === blogToModify.id);
    assert.strictEqual(blogToModify.likes, modifiedBlog.likes);
  });
});

describe('Deletion of a blog', () => {
  let token;

  beforeEach(async () => {
    return (token = await helper.testUserToken());
  });

  test('succeds with status code 204 if Id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert(blogsAtEnd, blogsAtStart - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
