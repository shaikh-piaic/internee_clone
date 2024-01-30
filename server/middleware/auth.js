import passport from "passport";
import { LoginStrategy } from "./login.js"
import { SignupStrategy } from "./register.js"

//Serialize user with passport using hes/her email
passport.serializeUser(function (email, done) {
    done(null, email);
});

//Deserialize user with passport using hes/her email
passport.deserializeUser(function (email, done) {
    done(null, email);
});

//Using the above
passport.use("local-login", LoginStrategy);
passport.use("local-register", SignupStrategy);

export default passport;