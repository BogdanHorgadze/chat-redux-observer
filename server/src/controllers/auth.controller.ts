import AuthService from '../services/auth.service'
import { constants } from '../constants'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { User } from '../entity/User'
import { getRepository } from "typeorm";


function authControllerGetLink(req: Request, res: Response) {
  return res.send(AuthService.getGoogleAuthURL());
}

async function authControllerSetUserToken(req: Request, res: Response) {
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

function authControllerGetUser(req: Request, res: Response) {
  try {
    const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME as string], process.env.JWT_SECRET as string);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
}

async function authControllerRegistration(req: Request, res: Response) {
  try {
    const { email } = req.body
    const userRepository = getRepository(User);
    const isEmail = await userRepository.findOne({ where: { email } });
    if (!isEmail) {
      const user = await userRepository.create(req.body)
      await userRepository.save(user);
      res.send({ message: "registrated" });
    } else {
      res.json({ message: "unknown error" })
    }
  } catch (e) {
    console.log(e)
  }
}

async function authControllerLogin(req: Request, res: Response) {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const userRepository = getRepository(User);
    const isUser = await userRepository.findOne({ where: { email, password } });
    if (isUser) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string)
      res.json({ token })
    } else {
      res.json({message:"user does not exist"})
    }
  } catch (e) {
    console.log(e)
  }
}

export { authControllerGetLink, authControllerSetUserToken, authControllerGetUser, authControllerRegistration, authControllerLogin }