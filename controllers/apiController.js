module.exports = {
  landingPage: (req, res) => {
    const message = "Hello World";
    res.status(200).json({ message });
  },
};
