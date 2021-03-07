require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    // const task = {
    //   "id": 4,
    //   "todo": "grocery shopping",
    //   "completed": false,
    //   "user_id": 2
    // };

    // const dataBase = {
    //   ...task,
    //   id: 4,
    // };

    // test('POST adds a new todo for a specific user', async () => {

    //   const task = {
    //     "id": 4,
    //     "todo": "grocery shopping",
    //     "completed": false,
    //     "user_id": 2
    //   };

    //   const data = await fakeRequest(app)
    //     .post('/api/todos')
    //     .send(task)
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200)
    //     ;

    //   expect(data.body).toEqual(dataBase);
    // });

    // test('GET returns all todos for a specific user', async () => {

    //   const data = await fakeRequest(app)
    //     .get('/api/todos')
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200)
    //     ;

    //   expect(data.body).toEqual(dataBase);
    // });

    // test('PUT updates a todo for a specific user', async () => {
    //   const updatedTask = {
    //     "todo": "grocery shopping",
    //     "completed": true,
    //   };

    //   const data = await fakeRequest(app)
    //     .put('/api/todos/4')
    //     .send(updatedTask)
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200)
    //     ;

    //   expect(data.body).toEqual({ ...dataBase, completed: true });
    // });
  });
});
