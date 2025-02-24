const Session = require("../models/Session");

const sessionMiddleware = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized: No session ID found" });
  }

  const session = await Session.findOne({ sessionId });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized: Invalid session ID" });
  }

  req.session = session;
  console.log(session);
  next();
};

module.exports = sessionMiddleware;
