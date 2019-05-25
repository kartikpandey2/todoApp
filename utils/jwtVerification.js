const jwt = require("jsonwebtoken");
const jwtSecret = "IamTodoApp";

module.exports = token => {
  try {
    token = token.substring(token.indexOf(" ") + 1);
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded) {
      return decoded;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
