const express = require("express");
const router = express.Router();

const {
  getAll,
  signup,
  login,
  deleteUser,
  editUser,
  getSingleUser,
} = require("../controllers/userController");

//GET ALL USERS
router.get("/users", getAll);

//SIGNUP
router.post("/signup", signup);

//LOGIN
router.post("/login", login);

//DELETE USER
router.delete("/:userId", deleteUser),
  //EDIT USER
  router.put("/:userId", editUser),
  //GET SINGLE USER
  router.get("/:userId", getSingleUser);

module.exports = router;
