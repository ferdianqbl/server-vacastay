const Category = require("../models/categorySchema");
const Bank = require("../models/bankSchema");
const Item = require("../models/itemSchema");
const Image = require("../models/imageSchema");
const Feature = require("../models/featureSchema");
const Activity = require("../models/activitySchema");

const fs = require("fs-extra");
const path = require("path");

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
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
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
const viewBank = async (req, res) => {
  try {
    const banks = await Bank.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/bank/view_bank", {
      title: "Vacastay | Bank",
      type: "bank",
      banks,
      alert,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

const addBank = async (req, res) => {
  try {
    const { nameBank, accountNumber, accountName } = req.body;
    // console.log(req.file);
    await Bank.insertMany([
      {
        nameBank,
        accountNumber,
        accountName,
        imageUrl: `images/bank/${req.file.filename}`,
      },
    ]);
    req.flash("alertMessage", "Success add new Bank");
    req.flash("alertStatus", "success");
    res.redirect("/admin/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

const editBank = async (req, res) => {
  try {
    const { id, nameBank, accountNumber, accountName } = req.body;
    // console.log(nameBank, accountName, accountNumber, id);
    if (req.file === undefined) {
      await Bank.updateOne(
        { _id: id },
        {
          nameBank,
          accountNumber,
          accountName,
          // imageUrl: `images/bank/${req.file.filename}`,
        }
      );
    } else {
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`)); // delete old image in public
      await Bank.updateOne(
        { _id: id },
        {
          nameBank,
          accountNumber,
          accountName,
          imageUrl: `images/bank/${req.file.filename}`,
        }
      );
    }

    req.flash("alertMessage", "Success Edit Bank");
    req.flash("alertStatus", "success");
    res.redirect("/admin/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

const deleteBank = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await Bank.findOne({ _id: id });

    await fs.unlink(path.join(`public/${bank.imageUrl}`)); // delete old image in public
    await bank.remove();

    req.flash("alertMessage", "Success Delete Bank");
    req.flash("alertStatus", "success");
    res.redirect("/admin/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};
// End Bank

// Item
const viewItem = async (req, res) => {
  try {
    const items = await Item.find()
      .populate({ path: "imageId", select: "id imageUrl" }) // path to get field image and select to get id and imageUrl from image collection ==> isi dari key imageId langsung dipecah / dijabarkan
      .populate({ path: "categoryId", select: "id name" });
    const categories = await Category.find();

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.render("admin/item/view_item", {
      title: "Vacastay | Item",
      type: "item",
      alert,
      items,
      categories,
      action: "view",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const showImageItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ _id: id }).populate({
      path: "imageId",
      select: "id imageUrl",
    });

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.render("admin/item/view_item", {
      title: "Vacastay | Item - Show Image Item",
      type: "item",
      alert,
      item,
      action: "show image",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const showEditItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ _id: id })
      .populate({
        path: "imageId",
        select: "id imageUrl",
      })
      .populate({
        path: "categoryId",
        select: "id name",
      });
    const categories = await Category.find();

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.render("admin/item/view_item", {
      title: "Vacastay | Item - Edit",
      type: "item",
      alert,
      item,
      categories,
      action: "edit",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const addItem = async (req, res) => {
  try {
    const { title, price, city, categoryId, description } = req.body;

    // check categoryId in category collection
    if (req.files.length > 0) {
      const category = await Category.findOne({ _id: categoryId });

      // insert new Item
      const newItem = {
        title,
        price,
        city,
        description,
        categoryId: category._id,
      };

      const item = await Item.create(newItem);

      // ======= for category collection relation =================================================
      // push itemId to category collection
      category.itemId.push({ _id: item._id });

      // save new category formatted
      await category.save();

      // ====== for image collection relation =================================================
      // save to image collection
      for (let i = 0; i < req.files.length; i++) {
        let imageSave = await Image.create({
          imageUrl: `images/item/${req.files[i].filename}`,
        });

        // push imageId to item collection
        item.imageId.push({ _id: imageSave._id });

        // save new item formatted
        await item.save();
      }

      req.flash("alertMessage", "Success add new Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    console.log(error);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, city, categoryId, description } = req.body;
    const item = await Item.findOne({ _id: id })
      .populate({
        path: "imageId",
        select: "id imageUrl",
      })
      .populate({
        path: "categoryId",
        select: "id name",
      });

    // check categoryId in category collection
    if (req.files.length > 0) {
      // update all image
      for (let i = 0; i < item.imageId.length; i++) {
        const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`)); // delete old image in public

        imageUpdate.imageUrl = `images/item/${req.files[i].filename}`; // add new image
        await imageUpdate.save(); // save imageUpdated

        await Item.updateOne(
          { _id: id },
          { title, price, city, categoryId, description }
        );
      }
    } else {
      await Item.updateOne(
        { _id: id },
        { title, price, city, categoryId, description }
      );
    }
    req.flash("alertMessage", "Success Edit Item");
    req.flash("alertStatus", "success");
    res.redirect("/admin/item");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ _id: id })
      .populate("imageId")
      .populate({ path: "categoryId", select: "id itemId" });

    // delete all image
    for (let i = 0; i < item.imageId.length; i++) {
      Image.findOne({ _id: item.imageId[i]._id })
        .then(async (image) => {
          await fs.unlink(path.join(`public/${image.imageUrl}`)); // delete image in public
          await image.remove(); // delete image from collection
        })
        .catch((error) => {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/admin/item");
        });
    }

    // delete itemId in category collection
    await Category.findOneAndUpdate(
      { _id: item.categoryId.id },
      {
        $pull: {
          itemId: item._id,
        },
      }
    );

    await item.remove();

    req.flash("alertMessage", "Success Delete Item");
    req.flash("alertStatus", "success");
    res.redirect("/admin/item");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

// End Item

// Detail Item
const viewDetailItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    // show feature and activity
    const features = await Feature.find({ itemId });
    const activities = await Activity.find({ itemId });
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/item/detail_item/view_detail_item", {
      title: "Vacastay | Detail Item",
      type: "item",
      alert,
      itemId,
      features,
      activities,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const addFeature = async (req, res) => {
  const { featureName, qty, itemId } = req.body;
  try {
    if (!req.file) {
      req.flash("alertMessage", "Should add image");
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/detail-item/${itemId}`);
    }

    // add to feature collection
    const newFeature = await Feature.create({
      name: featureName,
      qty,
      itemId,
      imageUrl: `images/item/feature/${req.file.filename}`,
    });

    // add featureId to item collection
    await Item.findOneAndUpdate(
      { _id: itemId },
      { $push: { featureId: newFeature._id } }
    );

    req.flash("alertMessage", "Success add Feature");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const editFeature = async (req, res) => {
  const { featureId, featureName, qty, itemId } = req.body;
  try {
    // console.log(nameBank, accountName, accountNumber, id);
    if (req.file === undefined) {
      await Feature.updateOne(
        { _id: featureId },
        {
          name: featureName,
          qty,
        }
      );
    } else {
      const feature = await Feature.findOne({ _id: featureId });
      await fs.unlink(path.join(`public/${feature.imageUrl}`)); // delete old image in public
      await Feature.updateOne(
        { _id: featureId },
        {
          name: featureName,
          qty,
          imageUrl: `images/item/feature/${req.file.filename}`,
        }
      );
    }

    req.flash("alertMessage", "Success Edit Feature");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const deleteFeature = async (req, res) => {
  const { featureId, itemId } = req.params;
  try {
    const feature = await Feature.findOne({ _id: featureId });
    await Item.findOneAndUpdate(
      { _id: itemId },
      {
        $pull: { featureId },
      }
    );

    await fs.unlink(path.join(`public/${feature.imageUrl}`)); // delete old image in public
    await feature.remove();

    req.flash("alertMessage", "Success Delete Feature");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const addActivity = async (req, res) => {
  const { activityName, type, itemId } = req.body;
  try {
    if (!req.file) {
      req.flash("alertMessage", "Should add image");
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/detail-item/${itemId}`);
    }

    // add to activity collection
    const newActivity = await Activity.create({
      name: activityName,
      type,
      itemId,
      imageUrl: `images/item/activity/${req.file.filename}`,
    });

    // add activityId to item collection
    await Item.findOneAndUpdate(
      { _id: itemId },
      { $push: { activityId: newActivity._id } }
    );

    req.flash("alertMessage", "Success add Activity");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const editActivity = async (req, res) => {
  const { activityId, activityName, type, itemId } = req.body;
  try {
    // console.log(nameBank, accountName, accountNumber, id);
    if (req.file === undefined) {
      await Activity.updateOne(
        { _id: activityId },
        {
          name: activityName,
          type,
        }
      );
    } else {
      const activity = await Activity.findOne({ _id: activityId });
      await fs.unlink(path.join(`public/${activity.imageUrl}`)); // delete old image in public
      await Activity.updateOne(
        { _id: activityId },
        {
          name: activityName,
          type,
          imageUrl: `images/item/activity/${req.file.filename}`,
        }
      );
    }

    req.flash("alertMessage", "Success Edit Activity");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

const deleteActivity = async (req, res) => {
  const { activityId, itemId } = req.params;
  try {
    const activity = await Activity.findOne({ _id: activityId });
    await Item.findOneAndUpdate(
      { _id: itemId },
      {
        $pull: { activityId },
      }
    );

    await fs.unlink(path.join(`public/${activity.imageUrl}`)); // delete old image in public
    await activity.remove();

    req.flash("alertMessage", "Success Delete Activity");
    req.flash("alertStatus", "success");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/detail-item/${itemId}`);
  }
};

// End Detail Item

// Booking
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
  addBank,
  editBank,
  deleteBank,
  viewItem,
  showImageItem,
  showEditItem,
  addItem,
  editItem,
  deleteItem,
  viewDetailItem,
  addFeature,
  editFeature,
  deleteFeature,
  addActivity,
  editActivity,
  deleteActivity,
  viewBooking,
};
