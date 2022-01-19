const Category = require("../models/categorySchema");

const viewDashboard = (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Vacastay | Dashboard",
    type: "dashboard",
  });
};

const viewCategory = (req, res) => {
  res.render("admin/category/view_category", {
    title: "Vacastay | Category",
    type: "category",
  });
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  // console.log(name);

  // Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
  await Category.create({ name });

  res.redirect("/admin/category");
};

const viewBank = (req, res) => {
  res.render("admin/bank/view_bank", {
    title: "Vacastay | Bank",
    type: "bank",
  });
};

const viewItem = (req, res) => {
  res.render("admin/item/view_item", {
    title: "Vacastay | Item",
    type: "item",
  });
};

const viewBooking = (req, res) => {
  res.render("admin/booking/view_booking", {
    title: "Vacastay | Booking",
    type: "booking",
  });
};

module.exports = {
  viewDashboard,
  viewCategory,
  addCategory,
  viewBank,
  viewItem,
  viewBooking,
};
