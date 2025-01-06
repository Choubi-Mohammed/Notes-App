const express = require('express');
const asyncHandler = require("express-async-handler");
const Router = express.Router();
const { NotesUsers, ValidateLoginUser, ValidateRegisterUser } = require('../Models/NotesUsers');
const Notes = require('../Models/Notes.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authentificationToken = require('../utilises');

// Register
Router.post("/create-account", asyncHandler(async (req, res) => {
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
        process.env.ACCESS_TOKEN_SECRET,
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
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "4d" }
    );
    const { password, ...other } = user._doc;

    res.status(200).json({ ...other, token });
}));

// Add note
Router.post("/add-note", authentificationToken, asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    const user = req.user;
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }
    const note = new Notes({
        title,
        content,
        tags: tags || [],
        userId: user.id
    });
    await note.save();
    res.status(201).json({
        error: false,
        note,
        message: "Note added successfully"
    });
}));

// Get notes
Router.get("/get-notes", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const notes = await Notes.find({ userId: user.id }).sort({ isPinned: -1 });
    res.status(200).json({
        error: false,
        notes
    });
}));

// Get user details
Router.get("/user", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const userDetails = await NotesUsers.findById(user.id).select("-password");
    if (!userDetails) {
        return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({
        error: false,
        user: userDetails
    });
}));

// Update note
Router.put("/update-note/:id", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const noteId = req.params.id;
    const { title, content, tags, isPinned } = req.body;
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }
    const note = await Notes.findOneAndUpdate(
        { _id: noteId, userId: user.id },
        { title, content, tags: tags || [], isPinned },
        { new: true }
    );
    if (!note) {
        return res.status(400).json({ error: true, message: "Note not found" });
    }
    res.status(200).json({
        error: false,
        note,
        message: "Note updated successfully"
    });
}));

// Delete note
Router.delete("/delete-note/:id", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const noteId = req.params.id;
    const note = await Notes.findOneAndDelete({ _id: noteId, userId: user.id });
    if (!note) {
        return res.status(400).json({ error: true, message: "Note not found" });
    }
    res.status(200).json({
        error: false,
        message: "Note deleted successfully"
    });
}));

// Update note pinned status
Router.put("/update-note-pinned/:id", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const noteId = req.params.id;
    const { isPinned } = req.body;

    const note = await Notes.findOneAndUpdate(
        { _id: noteId, userId: user.id },
        { isPinned },
        { new: true }
    );

    if (!note) {
        return res.status(400).json({ error: true, message: "Note not found" });
    }

    res.status(200).json({
        error: false,
        note,
        message: "Note pinned status updated successfully"
    });
}));
// search note 
Router.get("/search-note", authentificationToken, asyncHandler(async (req, res) => {
    const user = req.user;
    const { search } = req.body;
    if(!search){
        return res.status(400).json({ error: true, message: "Search is required" });
    }

    const notes = await Notes.find({ 
        userId: user._id, 
        $or: [
            { title: { $regex: new RegExp(search, 'i') } }, 
            { content: { $regex: new RegExp(search, 'i') } }
        ] 
    });
    res.status(200).json({
        error: false,
        notes,
        message: "Search results"
    });
}));
module.exports = Router;
