const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authUser");
const auth = require("../middleware/auth");

/* ================= PING ================= */
router.get("/ping", (req, res) => {
  const random = Math.floor(Math.random() * 1000) + 1;
  const calc = Math.sqrt(random * 73).toFixed(2);

  res.json({
    alive: true,
    randomNumber: random,
    calculation: calc,
    time: new Date().toISOString()
  });
});

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
   const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,

  // Cross-site cookies only needed in production (Vercel ↔ Render)
  sameSite: isProd ? "none" : "lax",

  // HTTPS required only in prod
  secure: isProd,

  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});


    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    // Compare password
    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,

  // Cross-site cookies only needed in production (Vercel ↔ Render)
  sameSite: isProd ? "none" : "lax",

  // HTTPS required only in prod
  secure: isProd,

  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});


   res.json({
    success: true,
    message: "Login successful",
    user: {
        name: user.name,
        email: user.email
    }
    });

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error" });
  }
});

/* ================= CURRENT USER ================= */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found" });

    res.json({
      success: true,
      user
    });
  } catch {
    res
      .status(500)
      .json({ message: "Server error" });
  }
});

/* ================= LOGOUT ================= */
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully"
  });
});

module.exports = router;
