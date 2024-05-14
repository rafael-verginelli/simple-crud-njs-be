const User = require("../models/User");

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users);

      res.writeHead(200, { "Content-Type": "json" });
      const jsonResponse = JSON.stringify(users);
      res.end(jsonResponse);
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(500, "Could not get user list.");
      const response = JSON.stringify({
        code: 500,
        message: "Could not get user list.",
      });
      return res.end(response);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      console.log(user);
      res.writeHead(200);
      return res.end(JSON.stringify(user));
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "User not found.");
      const response = JSON.stringify({
        code: 404,
        message: "User not found.",
      });
      return res.end(response);
    });
};

exports.createUser = (req, res, next) => {
  console.log("create user called");
  const name = req.body.name;
  const age = req.body.age;
  const email = req.body.email;

  const user = new User({
    name: name,
    age: age,
    email: email,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.writeHead(200, "User created successfully.");
      const response = JSON.stringify({
        code: 200,
        message: "User created successfully.",
      });
      return res.end(response);
    })
    .catch((error) => {
      console.log("Error Creating User.", error);
      res.writeHead(500, "Could not create user.");
      const response = JSON.stringify({
        code: 500,
        message: "Could not create user.",
      });
      return res.end(response);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId)
    .then((result) => {
      console.log(result);
      res.writeHead(200, "User deleted successfully.");
      const response = JSON.stringify({
        code: 200,
        message: "User deleted successfully.",
      });
      return res.end(response);
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(500, "Could not delete user.");
      const response = JSON.stringify({
        code: 500,
        message: "Could not delete user.",
      });
      return res.end(response);
    });
};

exports.editUser = (req, res, next) => {
  const userId = req.body.id;

  const updatedName = req.body.name;
  const updatedAge = req.body.age;
  const updatedEmail = req.body.email;

  User.findById(userId)
    .then((user) => {
      console.log(user);

      user.name = updatedName;
      user.age = updatedAge;
      user.email = updatedEmail;

      return user.save();
    })
    .then((result) => {
      console.log(result);
      res.writeHead(200, "User updated successfully.");
      return res.end(
        JSON.stringify({ code: 200, message: "User updated successfully." })
      );
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "User not found.");
      const response = JSON.stringify({
        code: 404,
        message: "User not found.",
      });
      return res.end(response);
    });
};
