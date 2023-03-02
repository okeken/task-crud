const auth = (req, res, next) => {
  console.log("Middleware Auth");
  next();
};

module.exports = {
  auth,
};
