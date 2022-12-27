const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  var token =
    req.body.token || req.query.token || req.headers|| req.params.token["access-token"];
  var  tokens;
   
  tokens= token.authorization.split(" ")
   var bearer = tokens[1]
    
   
  if (!bearer) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    
    const decoded = jwt.verify(bearer, config.JWT_KEY);
    
    
    req.user = decoded;
   
  } catch (err) {
    return res.status(401).send(err);
  }
  next();
};

module.exports = verifyToken;
