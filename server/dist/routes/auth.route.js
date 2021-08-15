"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router.get("/google/url", auth_controller_1.authControllerGetLink);
router.get("/google", auth_controller_1.authControllerSetUserToken);
router.get("/me", auth_controller_1.authControllerGetUser);
module.exports = router;
