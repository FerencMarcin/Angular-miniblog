const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "Uzytkownik zarejestrowany",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).send({ message: "Konto z takim adresem email juz istnieje" })
            });
    });
});

router.post('/login', async (req, res) => {
    const fetchedUser = await User.findOne({ email: req.body.email });
    if (!fetchedUser) return res.status(409).send({ message: "Konto z takim andresem email nie istnieje" })

    const validPass = await bcrypt.compare(req.body.password, fetchedUser.password);
    if (!validPass) return res.status(401).send({ message: "Nieprawidlowe haslo" })

    const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secretjwtkey_abcdefghijklmnoprstuvwxyz1234567890",
        { expiresIn: "1h" }
    );
    res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
    });
});

module.exports = router;
