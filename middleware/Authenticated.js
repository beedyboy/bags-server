const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Authenticated = (icomponent) => {
  return (req, res) => {
    const { authorization } = req.headers;
    const bearer = authorization.split(" ")[1];
    // console.log({bearer})
    if (!bearer || bearer === "null" || bearer === null) {
      return res.status(401).json({ error: "you must logged in" });
    }
    try {
      const { id } = jwt.verify(bearer, process.env.SECRET_KEY);
        // console.log({id})
      req.userId = id;
      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "you must logged in" });
    }
  };
}

module.exports = Authenticated; 
