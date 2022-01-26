const isLogin = (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash("alertMessage", "You Should Be Logged In");
    req.flash("alertStatus", "danger");
    res.redirect("/admin/login");
    return;
  } else {
    next();
  }
};

module.exports = isLogin;
