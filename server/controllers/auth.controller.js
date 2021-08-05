const AuthService = require('../services/auth.service')
const redirectURI = require('../constants')
const jwt = require('jsonwebtoken')

function authControllerGetLink(req, res) {
  return res.send(AuthService.getGoogleAuthURL());
}

async function authControllerSetUserToken(req, res) {
  const code = req.query.code;
  console.log(code)
  const { id_token, access_token } = await AuthService.getTokens({
    code,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
  });

  const googleUser = await AuthService.getGoogleUser(access_token, id_token)

  const token = jwt.sign(googleUser, process.env.JWT_SECRET);

  res.cookie(process.env.COOKIE_NAME, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(process.env.UI_ROOT_URI);
}

function authControllerGetUser(req, res) {
  try {
    const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.JWT_SECRET);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
}

module.exports = { authControllerGetLink, authControllerSetUserToken, authControllerGetUser }