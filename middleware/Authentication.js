const jwt = require("jsonwebtoken");


exports.requireSignIn = (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp && tmp.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded["data"];
    console.log("auth",req.user)
    console.log("hello")
    next();
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.toString() });
  }
};
