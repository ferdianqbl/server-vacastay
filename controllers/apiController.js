const Item = require("../models/itemSchema");
const Treasure = require("../models/activitySchema");
const Traveler = require("../models/bookingSchema");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
        .select("_id title country city price unit") // only get id, title, country, city, price, unit
        .limit(5) // only get 5 items
        .populate({ path: "imageId", select: "_id imageUrl" });

      const travelers = await Traveler.find();
      const treasures = await Treasure.find();
      const cities = await Item.find();

      res.status(200).json({
        hero: {
          travelers: travelers.length,
          treasures: treasures.length,
          cities: cities.length,
        },
        mostPicked,
      });
    } catch (error) {}
  },
};
