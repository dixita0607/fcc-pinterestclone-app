const verify = (req, res, next) => {
  if (req.user) next();
  else res.status(401).json({});
};

module.exports = verify;
