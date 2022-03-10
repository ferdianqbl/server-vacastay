const Item = require("../models/itemSchema");
const Treasure = require("../models/activitySchema");
const Traveler = require("../models/bookingSchema");
const Category = require("../models/categorySchema");
const Bank = require("../models/bankSchema");
const Member = require("../models/memberSchema");
const Booking = require("../models/bookingSchema");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
        .select("_id title country city price unit") // only get id, title, country, city, price, unit
        .limit(5) // only get 5 items
        .populate({ path: "imageId", select: "_id imageUrl" });

      const categories = await Category.find()
        .select("_id name")
        .limit(3)
        .populate({
          path: "itemId",
          select: "_id title imageId country city isPopular",
          perDocumentLimit: 4,
          options: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });
      const travelers = await Traveler.find();
      const treasures = await Treasure.find();
      const cities = await Item.find();

      // edit isPopular
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].itemId.length; j++) {
          const item = await Item.findOne({ _id: categories[i].itemId[j]._id });

          item.isPopular = false;
          await item.save();
          console.log(categories[i].itemId[j].sumBooking);
          if (categories[i].itemId[0] === categories[i].itemId[j]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "/images/testimonial/testimonial1.png",
        name: "Happy Family",
        rate: 4.5,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Ferdian",
        familyOccupation: "Software Engineer",
      };

      res.status(200).json({
        hero: {
          travelers: travelers.length,
          treasures: treasures.length,
          cities: cities.length,
        },
        mostPicked,
        categories,
        testimonial,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        errMess: error.message,
      });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id })
        .populate({
          path: "featureId",
          select: "_id name qty imageUrl",
        })
        .populate({
          path: "activityId",
          select: "_id name type imageUrl",
        })
        .populate({ path: "imageId", select: "_id imageUrl" });

      const banks = await Bank.find();

      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "/images/testimonial/testimonial2.png",
        name: "Happy Family",
        rate: 4.5,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Ferdian",
        familyOccupation: "Software Engineer",
      };

      res.status(200).json({
        // ...item,
        ...item._doc,
        banks,
        testimonial,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        errMess: error.message,
      });
    }
  },

  bookingPage: async (req, res) => {
    try {
      const {
        duration,
        // price,
        bookingStartDate,
        bookingEndDate,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        accountHolder,
        bankFrom,
        itemId,
      } = req.body;

      if (!req.file) {
        res.status(400).json({ message: "Image not found" });
      }

      if (
        itemId === undefined ||
        duration === undefined ||
        // price === undefined ||
        bookingStartDate === undefined ||
        bookingEndDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        emailAddress === undefined ||
        phoneNumber === undefined ||
        accountHolder === undefined ||
        bankFrom === undefined
      ) {
        res.status(400).json({ message: "Please fill all the field" });
      }

      const item = await Item.findOne({ _id: itemId });

      if (!item) {
        return res.status(400).json({ message: "Item not found" });
      }
      item.sumBooking += 1;

      await item.save();

      // booking payment
      let total = item.price * duration;
      let tax = total * 0.1;

      const invoice = Math.floor(1000000 + Math.random() * 9000000);

      const member = await Member.create({
        firstName,
        lastName,
        email: emailAddress,
        phoneNumber,
      });

      const newBooking = {
        invoice,
        bookingStartDate,
        bookingEndDate,
        total: (total += tax),
        itemId: {
          _id: item.id,
          title: item.title,
          price: item.price,
          duration,
        },
        memberId: member.id,
        payment: {
          proofPayment: `images/buktibayar/${req.file.filename}`,
          bankFrom,
          accountHolder,
        },
      };

      const booking = await Booking.create(newBooking);

      res.status(201).json({
        message: "Successfully booked",
        booking,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        errMess: error.message,
      });
    }
  },
};
