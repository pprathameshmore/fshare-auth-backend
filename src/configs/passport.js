const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserServices = require("../services/user");
const { config } = require("../configs/index");
const { generateRefreshToken } = require("../helpers/jwt-token-generate");
const { GeneralError } = require("../utils/errors");

const authResponse = async (token, tokenSecret, profile, done) => {
  const email = profile.emails[0].value;
  const profilePhoto = profile.photos[0].value;
  const condition = { email };
  const user = await UserServices.checkUser({ condition });
  if (user === undefined || !user || user === null) {
    const userCreated = await UserServices.createUser({
      username: profile.displayName,
      email,
      profilePhoto,
      refreshToken: null,
    });
    const { id } = userCreated.toJSON();
    userCreated.refreshToken = generateRefreshToken({ id });
    const updatedUser = await userCreated
      .save()
      .catch((error) => console.log(error));
    done(null, updatedUser);
  } else {
    const { id, refreshToken } = user.toJSON();
    if (!refreshToken || refreshToken === null) {
      const generatedRefreshToken = generateRefreshToken({ id });
      const fields = {
        refreshToken: generatedRefreshToken,
      };
      const condition = { id: id };
      const userUpdated = await UserServices.updateUser({
        fields,
        condition,
      });
      done(null, userUpdated);
    }
    done(null, user);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.PASSPORT.GOOGLE_CONSUMER_KEY,
      clientSecret: config.PASSPORT.GOOGLE_CONSUMER_SECRET,
      callbackURL: `${config.HOSTNAME}/api/v1/auth/google/callback`,
    },
    authResponse
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
