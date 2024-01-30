import express from "express"
const login = express.Router();

//Passport file for login/register
import passport from "../middleware/auth.js";

//Login passport authentication
login.post("/login", function (req, res) {
    passport.authenticate("local-login", function (error, user, info) {
        if (error) {
            return res.status(500).json({
                message: error || "Something happend",
                error: error.message || "Server error",
            });
        }

        req.logIn(user, function (error, data) {
            if (error) {
                return res.status(500).json({
                    message: error || "Something happend",
                    error: error.message || "Server error",
                });
            }
        });

        user.isAuthenticated = true;
        return res.json(user);
    })(req, res);
});

export default login;