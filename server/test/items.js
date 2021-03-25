const chai = require("chai");
const chaihttp = require("chai-http");
const apiAddress = "http://localhost:4000/";
const itemId = "604c3507e0afe238410b15fd";
const authToken =
  "$2b$10$29bJsAzVehvbuHZ4iKTBCuHoy5O2HFE/iX.COXuyfzitAl7MPvcM6";
// assertion style
chai.should();
chai.use(chaihttp);

describe("Items API", () => {
  before(function(done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });

  // test GET items route
  describe("/GET item", function() {
    it("it should get all the items ", async function() {
      await chai
        .request(apiAddress)
        .get("/items")
        .then((response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
        })
        .catch((error) => {
          throw error;
        });
    });
    it("it should get item by id", async function() {
      await chai
        .request(apiAddress)
        .get("/items/" + itemId)
        .then((response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
          response.body.should.have.property("category");
          response.body.should.have.property("location");
          response.body.should.have.property("imagine");
          response.body.should.have.property("cloudinary_id");
          response.body.should.have.property("price");
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  // test POST items route
  describe("/POST item", function() {
    it("it should create the item ", async function() {
      this.timeout(40000);
      await chai
        .request(apiAddress)
        .post("/items")
        .set("auth-token", authToken)
        .type("form")
        .field("Content-Type", "multipart/form-data")
        .field("title", "A Title")
        .field("description", "A Description")
        .field("category", "tags")
        .field("location", "city, street")
        .field("price", 10)
        .attach("imagine", "./test/assets/a.jpg")
        .then((response) => response.should.have.status(201))
        .catch((error) => {
          throw error;
        });
    });
    it("it should not create the item without a title", async function() {
      this.timeout(40000);
      await chai
        .request(apiAddress)
        .post("/items")
        .set("auth-token", authToken)
        .type("form")
        .field("Content-Type", "multipart/form-data")
        .field("description", "A Description")
        .field("category", "tags")
        .field("location", "city, street")
        .field("price", 10)
        .attach("imagine", "./test/assets/a.jpg")
        .then((response) => response.should.have.status(404))
        .catch((error) => {
          throw error;
        });
    });
  });

  // test PATCH route
  describe("/PATCH item", function() {
    this.timeout(40000);
    it("it should update the item ", async function() {
      await chai
        .request(apiAddress)
        .patch("/items/" + itemId)
        .set("auth-token", authToken)
        .type("form")
        .field("Content-Type", "multipart/form-data")
        .field("title", "title 2")
        .field("description", "A Description 2")
        .field("category", "tags 2")
        .field("location", "city, street")
        .field("price", 10)
        .attach("imagine", "./test/assets/a.jpg")
        .then((response) => {
          response.should.have.status(200);
          console.log(response.body);
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  // test DELETE route
  describe("/DELETE item", function() {
    this.timeout(40000);
    it("it should delete the item by id ", async function() {
      await chai
        .request(apiAddress)
        .delete("/items/" + itemId)
        .set("auth-token", authToken)
        .then((response) => {
          response.should.have.status(200);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
});
