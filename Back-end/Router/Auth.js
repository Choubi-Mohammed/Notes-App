const express = require('express');
const asyncHandler = require("express-async-handler");
const Router = express.Router();
const { NotesUsers, ValidateLoginUser, ValidateRegisterUser } = require('../Models/NotesUsers');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
Router.post("/register", asyncHandler(async (req, res) => {
    const { error } = ValidateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await NotesUsers.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "This user is already registered!" });
    }

    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    const NoteUser = new NotesUsers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    const result = await NoteUser.save();
    const token = jwt.sign(
        { id: result._id, name: result.name },
        "SecretKey",
        { expiresIn: "4d" }
    );
    const { password, ...other } = result._doc;

    res.status(201).json({ ...other, token });
}));

// Login
Router.post("/login", asyncHandler(async (req, res) => {
    const { error } = ValidateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await NotesUsers.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id, name: user.name },
        "SecretKey",
        { expiresIn: "4d" }
    );
    const { password, ...other } = user._doc;

    res.status(200).json({ ...other, token });
}));

module.exports = Router;
