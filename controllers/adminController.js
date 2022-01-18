const viewDashboard = (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Vacastay | Dashboard",
  });
};

const viewCategory = (req, res) => {
  res.render("admin/category/view_category", {
    title: "Vacastay | Category",
  });
};

module.exports = { viewDashboard, viewCategory };
