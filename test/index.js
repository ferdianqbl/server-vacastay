const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const fs = require("fs");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET Landing Page", (done) => {
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

  it("GET Detail Page", (done) => {
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

  it("POST Booking Page", (done) => {
    const image = __dirname + "/buktibayar.jpeg";
    const dataSample = {
      image,
      duration: "2",
      bookingStartDate: "09-04-2022",
      bookingEndDate: "12-04-2022",
      firstName: "adrian",
      lastName: "firdaus",
      emailAddress: "adrian@gmail.com",
      phoneNumber: "0812212133113",
      accountHolder: "adrian",
      bankFrom: "BCA",
      itemId: "62143218efe86cde28e7e10a",
    };
    chai
      .request(app)
      .post("/api/v1/member/booking-page")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("itemId", dataSample.itemId)
      .field("duration", dataSample.duration)
      .field("bookingStartDate", dataSample.bookingStartDate)
      .field("bookingEndDate", dataSample.bookingEndDate)
      .field("firstName", dataSample.firstName)
      .field("lastName", dataSample.lastName)
      .field("emailAddress", dataSample.emailAddress)
      .field("phoneNumber", dataSample.phoneNumber)
      .field("accountHolder", dataSample.accountHolder)
      .field("bankFrom", dataSample.bankFrom)
      .attach("image", fs.readFileSync(dataSample.image), "buktibayar.jpeg")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Successfully booked");

        expect(res.body).to.have.property("booking");
        expect(res.body.booking).to.have.all.keys(
          "payment",
          "_id",
          "invoice",
          "bookingStartDate",
          "bookingEndDate",
          "total",
          "itemId",
          "memberId",
          "__v"
        );
        expect(res.body.booking.payment).to.have.all.keys(
          "status",
          "proofPayment",
          "bankFrom",
          "accountHolder"
        );
        expect(res.body.booking.itemId).to.have.all.keys(
          "_id",
          "title",
          "price",
          "duration"
        );
        console.log(res.body.booking);
        done();
      });
  });
});
