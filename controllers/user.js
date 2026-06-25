const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const URL = require('../models/url');
const {setUser} = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });

    const allUrls = await URL.find({});

    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email , password});

    if (!user) {
        return res.render("login", { error: "User not found" });
    }

    if (user.password !== password) {
        return res.render("login", { error: "Invalid password" });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    const token = setUser(user);
    res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    });
    return res.redirect('/');

    // return res.json({ token });

}
 

module.exports = {
    handleUserSignup,
    handleUserLogin
};