const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../helpers/processJwt");

exports.getAll = async (req, res) => {
  const users = await User.find()
    .populate("meetups", ["_id", "date", "status"])
    .populate("notifications", ["_id", "host", "title"]);
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener todos los usuarios." });
  }
};

exports.signup = async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({ email });
  if (testEmail) {
    return res
      .status(500)
      .json({ message: "El email ingresado ya esta registrado." });
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "El usuario no pudo ser creado" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("notifications", [
    "_id",
    "host",
    "title",
  ]);

  if (!user) {
    return res
      .status(500)
      .json({ message: "El email no se encuentra registrado" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({ message: "La contraseña es incorrecta" });
  }

  const token = await generateJwt(user._id);
  return res.status(200).json({ token, user });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  try {
    return res.status(203).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo eliminar el usuario." });
  }
};

exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const editedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  try {
    return res.status(200).json(editedUser);
  } catch (error) {
    return res.status(500).json({ message: "El usuario no pudo ser editado." });
  }
};

exports.getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const singleUser = await User.findById(userId)
    .populate("meetups")
    .populate("notifications", ["_id", "host", "title"]);

  try {
    return res.status(200).json(singleUser);
  } catch (error) {
    return res.status(500).json({ message: "Usuario no encontrado." });
  }
};
