const {Router} = require('express')
const router = Router()
const {authControllerGetLink, authControllerSetUserToken, authControllerGetUser} = require('../controllers/auth.controller')

router.get("/google/url", authControllerGetLink );

 router.get(`/google`,authControllerSetUserToken );

 router.get("/me", authControllerGetUser);

 module.exports = router