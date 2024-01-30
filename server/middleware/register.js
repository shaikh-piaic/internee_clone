import { Strategy } from "passport-local";
import User from "../model/user.js";
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);
export const SignupStrategy = new Strategy(
    { passReqToCallback: true },
    async function (req, username, password, done) {
        const user = await User.findOne({ username })
        console.log(user);
        if (!user) {
            const encryptedPassword = bcrypt.hashSync(password, salt);

            let newUser = new User({
                username,
                password: encryptedPassword,
            });

            await newUser.save();
            done(null, newUser)
        }
        if (user) {
            return done("User already exist. Please login!", null);
        }
    }
);