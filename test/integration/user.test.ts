import request from "supertest";
import app from "../../src/app";
import models from '../../src/models';

import { hashPassword } from '../../src/helpers/authhelper';

const baseURL = '/api/v1';
describe("GET /", () => {
  it("should return 200 OK", () => {
    return request(app).get("/")
      .expect(200);
  });
});


describe("POST /signup", () => {
  it("should signup a new user", async (done) => {
    const payload = {
      "email": "test@test.com",
      "password": "password",
      "firstName": "annon",
      "lastName": "domini"
    };
    const result = await request(app).post(`${baseURL}/signup`)
      .send(payload);
      expect(result.status).toEqual(201);
      expect(result.body.message).toEqual('Signup Successfull. Please Verify your email address');
      expect(result.body.success).toEqual(true);
      done();
  });

  it("should return 422 if email is not unique", async (done) => {
    const payload = {
      "email": "test@test.com",
      "password": "password",
      "firstName": "annon",
      "lastName": "domini"
    };
    const result = await request(app).post(`${baseURL}/signup`)
      .send(payload);
    expect(result.status).toEqual(422);
    expect(result.body.message).toEqual('VALIDATION_ERROR: Email Already Exists');
    expect(result.body.status).toEqual('error');
    done();
  });
});


describe("POST /login", () => {
  beforeAll(async () => {
    await models.UserModel.insertMany([{
      email: 'user1@test.com',
      password: hashPassword('sdfdas'),
      name: 'user1',
      verified: true,
      isBlocked: false,
      role: { name: 'public_user' },
    }, {
      email: 'user@test.com',
      password: hashPassword('sdfdas'),
      name: 'user',
      verified: true,
      isBlocked: true,
      role: { name: 'public_user' },
    }]);
  });

  afterAll(async () => {
    await models.CategoryModel.deleteMany({});
    await models.UserModel.deleteMany({});
  })

  it("should login a registered user", async (done) => {
    const payload = {
      "email": "user1@test.com",
      "password": "sdfdas",
    };
    const result = await request(app).post(`${baseURL}/login`)
      .send(payload);
    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual('Login Successful');
    expect(result.body.success).toEqual(true);
    done();
  });


  it("should return 401 if password is not incorrect", async (done) => {
    const payload = {
      "email": "user@test.com",
      "password": "passwdord",
    };
    const result = await request(app).post(`${baseURL}/login`)
      .send(payload);

    expect(result.status).toEqual(401);
    expect(result.body.message).toEqual('LOGIN-ERROR: Email or Password is incorrect');
    expect(result.body.status).toEqual('error');
    done();
  });

  it("should return 401 if user is blocked", async (done) => {
    const payload = {
      "email": "user@test.com",
      "password": "sdfdas",
    };
    const result = await request(app).post(`${baseURL}/login`)
      .send(payload);
    expect(result.status).toEqual(401);
    expect(result.body.message).toEqual('PERM-ERROR: Sorry, you cannot login at this time');
    expect(result.body.status).toEqual('error');
    done();
  });



});

