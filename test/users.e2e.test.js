const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
require("dotenv").config();
const { User, newUser } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;
jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing the route auth/users", () => {
  it("should return 201 registration", async (done) => {
    const res = await request(app)
      .post(`/auth/register`)
      .send(newUser)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 409 registration - email already used", async (done) => {
    const res = await request(app)
      .post(`/auth/register`)
      .send(newUser)
      .set("Accept", "application/json");
    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 200 login", async (done) => {
    const res = await request(app)
      .post(`/auth/login`)
      .send(newUser)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 401 login", async (done) => {
    const res = await request(app)
      .post(`/auth/login`)
      .send({ email: "fake@tets.com", password: "123456" })
      .set("Accept", "application/json");
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 200 upload avatar", async (done) => {
    const buffer = await fs.readFile("./test/test-avatar.jpg");
    const res = await request(app)
      .patch(`/users/avatars`)
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buffer, "test-avatar.jpg");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.avatarURL).toBeDefined();

    done();
  });
  it("should return 401 upload avatar with wrong token", async (done) => {
    const buffer = await fs.readFile("./test/test-avatar.jpg");
    const res = await request(app)
      .patch(`/users/avatars`)
      .set("Authorization", `Bearer ${123654}`)
      .attach("avatar", buffer, "test-avatar.jpg");
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
    done();
  });
});
