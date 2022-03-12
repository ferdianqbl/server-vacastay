const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET LANDING PAGE", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/landing-page")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("hero");
        expect(res.body.hero).to.have.all.keys(
          "travelers",
          "treasures",
          "cities"
        );
        expect(res.body).to.have.property("mostPicked");
        expect(res.body.mostPicked).to.have.an("array");
        expect(res.body).to.have.property("categories");
        expect(res.body.categories).to.have.an("array");
        expect(res.body).to.have.property("testimonial");
        expect(res.body.testimonial).to.have.an("object");
        done();
      });
  });

  it("GET DETAIL PAGE", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/detail-page/62143218efe86cde28e7e10a")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("country");
        expect(res.body).to.have.property("isPopular");
        expect(res.body).to.have.property("sumBooking");

        expect(res.body).to.have.property("imageId");
        expect(res.body.imageId).to.have.an("array");

        expect(res.body).to.have.property("featureId");
        expect(res.body.featureId).to.have.an("array");

        expect(res.body).to.have.property("activityId");
        expect(res.body.activityId).to.have.an("array");

        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("price");
        expect(res.body).to.have.property("city");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("__v");

        expect(res.body).to.have.property("banks");
        expect(res.body.banks).to.have.an("array");

        expect(res.body).to.have.property("testimonial");
        expect(res.body.testimonial).to.have.an("object");
        done();
      });
  });
});
