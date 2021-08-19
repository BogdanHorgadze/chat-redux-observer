import { Router } from 'express'
import { authControllerGetLink, authControllerSetUserToken, authControllerGetUser, authControllerRegistration } from '../controllers/auth.controller'

const router = Router()
router.get("/google/url", authControllerGetLink);

router.get(`/google`, authControllerSetUserToken);

router.get("/me", authControllerGetUser);

router.post("/register", authControllerRegistration);

module.exports = router