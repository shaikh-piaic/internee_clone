import { Strategy } from "passport-local";
import User from "../model/user.js";
import bcrypt from "bcryptjs"

export const LoginStrategy = new Strategy(
    async function (username, password, done) {
        const user = await User.findOne({ username })
        // if (err) {
        //     return done(err, null);
        // }

        if (!user) {
            return done("No user found", null);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return done("Username or Password not valid", null);
        }

        return done(null, { user });
    }
);