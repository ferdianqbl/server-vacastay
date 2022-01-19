const Category = require("../models/categorySchema");

const viewDashboard = (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Vacastay | Dashboard",
    type: "dashboard",
  });
};

// Category
const viewCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.render("admin/category/view_category", {
      title: "Vacastay | Category",
      type: "category",
      categories,
      alert,
    });
  } catch (error) {
    res.redirect("/admin/category");
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
    await Category.create({ name });

    req.flash("alertMessage", "Success add new Category");
    req.flash("alertStatus", "success");
    res.redirect("/admin/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

const editCategory = async (req, res) => {
  try {
    const { name, id } = req.body;

    await Category.updateOne({ _id: id }, { name });
    req.flash("alertMessage", "Success Edit Category");
    req.flash("alertStatus", "success");
    res.redirect("/admin/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.deleteOne({ _id: id });
    req.flash("alertMessage", "Success Delete Category");
    req.flash("alertStatus", "success");
    res.redirect("/admin/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

// End Category
// Bank
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
  editCategory,
  deleteCategory,
  viewBank,
  viewItem,
  viewBooking,
};
