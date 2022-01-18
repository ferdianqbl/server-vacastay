const viewDashboard = (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Vacastay | Dashboard",
  });
};

module.exports = { viewDashboard };
