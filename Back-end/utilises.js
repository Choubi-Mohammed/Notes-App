const jwt = require("jsonwebtoken");

const authentificationToken = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authentificationToken;