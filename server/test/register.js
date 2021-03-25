const chai = require("chai");
const chaihttp = require("chai-http");
const apiAddress = "http://localhost:4000";

// assertion style
chai.should();
chai.use(chaihttp);

describe("Register API", () => {
  before(function(done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });

  describe("Test user creation ", function() {
    it("it should create a new user", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "tester",
          password: "123456",
          email: "tester@gmail.com"
        })
        .then((response) => {
          response.should.have.status(201);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user with an existing username", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "tester",
          password: "123456",
          email: "hihihaha@gmail.com"
        })
        .then((response) => {
          response.should.have.status(409);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user with an existing email", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "hihihaha",
          password: "123456",
          email: "tester@gmail.com"
        })
        .then((response) => {
          response.should.have.status(409);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user request username", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          password: "123456",
          email: "tester@gmail.com"
        })
        .then((response) => {
          response.should.have.status(400);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user request password", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "hihihaha",
          email: "tester@gmail.com"
        })
        .then((response) => {
          response.should.have.status(400);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user request email", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "hihihaha",
          password: "123456"
        })
        .then((response) => {
          response.should.have.status(400);
        })
        .catch((error) => {
          throw error;
        });
    });

    it("it should reject a new user with an invalid email", async function() {
      await chai
        .request(apiAddress)
        .post("/register")
        .send({
          username: "hihihaha",
          password: "123456",
          email: "tester"
        })
        .then((response) => {
          response.should.have.status(400);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
});
