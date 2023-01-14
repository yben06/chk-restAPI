const User = require("../models/user");
const express = require("express");
const router = express.Router();
const { success } = require("../utils/helper");

// http://localhost:5000/api/users
// Liste de tout les users.
router.get("/", async (req, res) => {
  const message = "List of all users.";

  try {
    const users = await User.find({});
    !users.length
      ? res.status(204).json({ message: "There are no user in the database." })
      : res.json(success(message, users));
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// http://localhost:5000/api/users/new_add
// Ajout d'un nouvelle user.
router.post("/new_add", async (req, res) => {
  const user = new User(req.body);
  const message = "A new user has just been added.";

  try {
    const saveUser = await user.save();
    res.status(201).json(success(message, saveUser));
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// http://localhost:5000/api/users/updateUser/:id
// Mettre a jour un user par son ID.
router.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const message = "The user has been updated.";

  try {
    const upUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !upUser
      ? res
          .status(404)
          .json({ message: "No user with the matching ID was found." })
      : res.json(success(message, upUser));
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// http://localhost:5000/api/users/deleteUser/:id
// Supprimer un user par son ID.
router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  const message = "This user has been deleted.";

  try {
    const delUser = await User.findByIdAndDelete(id);
    !delUser
      ? res
          .status(404)
          .json({ message: "No user with the matching ID was found." })
      : res.json(success(message, delUser));
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
