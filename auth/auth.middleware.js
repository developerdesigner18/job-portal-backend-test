import * as passportService from "./passport.js"
import passport from "passport";

// Create the interceptor and ensure that the cookie is turned off
export const requireSignIn = passport.authenticate("local", { session: false });
export const requireAuth = passport.authenticate("jwt", { session: false });