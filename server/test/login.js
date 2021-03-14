const chai = require("chai");
const chaihttp = require("chai-http");
const apiAddress = "http://localhost:4000";

// assertion style
chai.should();
chai.use(chaihttp);

describe("Register API", () => {
  before(function(done) {
    this.timeout(2000); // A very long environment setup.
    setTimeout(done, 1500);
  });
  it("it should log in with correct username and password", async function() {
    await chai
      .request(apiAddress)
      .post("/login")
      .send({
        email: "tester@gmail.com",
        password: "123456"
      })
      .then((response) => response.should.have.status(200))
      .catch((error) => {
        throw error;
      });
  });
  it("it should log in with wrong email", async function() {
    await chai
      .request(apiAddress)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      })
      .then((response) => response.should.have.status(400))
      .catch((error) => {
        throw error;
      });
  });
  it("it should log in with wrong password", async function() {
    await chai
      .request(apiAddress)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "12346"
      })
      .then((response) => response.should.have.status(400))
      .catch((error) => {
        throw error;
      });
  });
});
