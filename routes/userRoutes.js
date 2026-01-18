const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const { summarize } = require("../utils/ai");

router.post("/submit", auth, async (req, res) => {
  try {

    const {
      name,
      email,
      role,
      condition,
      message,
      helpOptions,
      phone
    } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    let summary = "";

    if (role === "patient") {
      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message required"
        });
      }

      summary = summarize(message);
    }

    if (role === "volunteer") {
      if (!phone || helpOptions.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Phone & help options required"
        });
      }
    }

    const user = await User.create({
      name,
      email,
      role,

      // patient
      condition,
      message,
      summary,

      // volunteer
      helpOptions,
      phone
    });

    res.status(201).json({
      success: true,
      message: "Saved successfully",
      summary
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
