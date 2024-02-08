const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/createUser", async (req, res) => {
    try {
        await User.create({
            name: "Saif",
            password: "abc",
            email: "saif2003@gmail.com",
            location: "Delhi"
        });
        console.log("Done")
        res.status(201).json({ success: true }); 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" }); 
    }
});

module.exports = router;
