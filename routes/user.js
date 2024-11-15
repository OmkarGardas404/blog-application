const express = require("express");
const USER = require("../model/user");
const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
})
router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.post('/signup' , async(req, res) => {
    const {fullName, email, password} = req.body;
    await USER.create({
        fullName,
        email,
        password,
    });
    res.redirect('/');
});
router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
});

module.exports = router