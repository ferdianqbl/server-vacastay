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

const viewBank = (req, res) => {
  res.render("admin/bank/view_bank", {
    title: "Vacastay | Bank",
    type: "bank",
  });
};

module.exports = { viewDashboard, viewCategory, viewBank };
