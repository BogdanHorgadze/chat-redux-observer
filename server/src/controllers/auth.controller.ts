import AuthService from '../services/auth.service'
import {constants} from '../constants'
import jwt from 'jsonwebtoken'
import {Request, Response} from 'express';
import {User} from '../entity/User'
import {getRepository} from "typeorm";


function authControllerGetLink(req : Request, res : Response) {
  return res.send(AuthService.getGoogleAuthURL());
}

async function authControllerSetUserToken(req : Request, res : Response) {
  const code = req.query.code as string;
  console.log(code)
  const { id_token, access_token } = await AuthService.getTokens({
    code,
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirectUri: `${process.env.SERVER_ROOT_URI}/${constants.redirectURI}`,
  });

  const googleUser = await AuthService.getGoogleUser(access_token, id_token)

  const token = jwt.sign(googleUser, process.env.JWT_SECRET as string);

  res.cookie(process.env.COOKIE_NAME as string, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(process.env.UI_ROOT_URI as string);
}

function authControllerGetUser(req : Request, res : Response) {
  try {
    const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME as string], process.env.JWT_SECRET as string);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
}

// type registration = {
//   firstName: string,
//   lastName : string
// }

async function authControllerRegistration (req : Request, res : Response){
  const userRepository = getRepository(User);
  const user = await userRepository.create(req.body)
  const results = await userRepository.save(user);
  return res.send(results);
}

export { authControllerGetLink, authControllerSetUserToken, authControllerGetUser, authControllerRegistration }