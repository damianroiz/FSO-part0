const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./test_helper');

beforeEach(async () => {
  try {
    await User.deleteMany({});
    const userObject = helper.initialUsers.map((user) => new User(user));
    const promiseArray = userObject.map((user) => user.save());
    await Promise.all(promiseArray);
  } catch (err) {
    console.error(err);
  }
});

/// 4.16
test('a username or password of less than three characters is not added', async () => {
  const wrongUser = {
    username: 'S',
    name: 'Scott',
    password: 'aventure',
  };

  await api
    .post('/api/users')
    .send(wrongUser)
    .expect(400)
    .expect((res) => console.log(res.body.error))
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/users');
  assert.strictEqual(response.body.length, helper.initialUsers.length);
});
