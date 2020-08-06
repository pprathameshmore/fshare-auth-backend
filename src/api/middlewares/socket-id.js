exports.addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};
