const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please sign in." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User created successfully. Please log in." });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful.", token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
