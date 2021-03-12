const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User, tasks, newContact } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;
jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing the route api/contacts", () => {
  let idNewContact;
  describe("should handle get request", () => {
    it("should return status 200 for get all contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.tasks).toBeInstanceOf(Array);
      done();
    });
    it("should return status 200 for get by id", async (done) => {
      const contact = tasks[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty("_id");
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });
    it("should return status 404 for get by wrong id", async (done) => {
      const wrongID = 123456789123456789444227;
      const res = await request(app)
        .get(`/api/contacts/${wrongID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle post request", () => {
    it("should return status 201 for post to create contact", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });
    it("should return status 400 for post with wrong field", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return status 400 for post without required field name", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Anatoliy" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle patch request", () => {
    it("should return status 200 for patch to update contact", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "newContact" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe("newContact");
      done();
    });
    it("should return status 400 for patch with wrong field", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ test: 1 })
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return status 404 for patch with wrong id", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts${123456789123456789444227}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Anatoliy" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle delete request", () => {
    it("should return status 200 for delete contact by id", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact._id).toBe(idNewContact);
      done();
    });
    it("should return status 404 for delete contact with wrong id", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts${123456789123456789444227}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
