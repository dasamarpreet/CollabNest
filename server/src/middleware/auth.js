const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided." });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id; // Attach userId to the request
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized." });
    }
};

module.exports = auth;
