const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const jwtSecret = "mynameissaif"

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Invalid Password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        console.log("User Added")
        res.json({ success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        res.json({ success: false });
    }
});


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email;

    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with corrext credentials" })
        }

        const passCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!passCompare) {
            return res.status(400).json({ errors: "Try logging with corrext credentials" })
        }

        const data = {
            user:{
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken: authToken});


    } catch (error) {
        console.error("Error creating user:", error);
        res.json({ success: false });
    }
});



module.exports = router;
