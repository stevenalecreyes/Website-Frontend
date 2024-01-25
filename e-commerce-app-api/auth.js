const jwt = require("jsonwebtoken");
const secret = "ECommerceAPI";

module.exports.createAccessToken = (user) => {

  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  }

  return jwt.sign(data, secret, {});
}

module.exports.verify = (req, res, next) => {

  console.log(req.headers.authorization);

  let token = req.headers.authorization;

  if(typeof token === "undefined") {

    return res.send({auth: "Failed. No Token"});

  } else {

    console.log(token);
    token = token.slice(7, token.length);

    jwt.verify(token, secret, function (err, decodedToken) {

      if(err) {
        return res.send({auth: "Failed", message: err.message})
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    })
  }
}


module.exports.verifyAdmin = (req, res, next) => {
  if(req.user.isAdmin){
   
    next();

  } else {

    return res.send({
      auth: "Failed",
      message: "Action Forbidden"
    })
  }
}

module.exports.decodeAccessToken = (token) => {
  try {
    token = token.slice(7); // Remove "Bearer " from the token string
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};