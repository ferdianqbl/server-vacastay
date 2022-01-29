const Item = require("../models/itemSchema");
const Treasure = require("../models/activitySchema");
const Traveler = require("../models/bookingSchema");
const Category = require("../models/categorySchema");

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
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });
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
        categories,
      });
    } catch (error) {}
  },
};
