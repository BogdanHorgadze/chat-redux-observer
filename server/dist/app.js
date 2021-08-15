"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var ws_1 = __importDefault(require("ws"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var PORT = process.env.PORT || 5000;
var app = express_1.default();
var server = http_1.default.createServer(app);
app.use(cors_1.default({
    origin: process.env.UI_ROOT_URI,
    credentials: true,
}));
app.use(cookie_parser_1.default());
app.use('/auth', require('./routes/auth.route'));
var webSocketServer = new ws_1.default.Server({
    server: server,
    verifyClient: function (_a, done) {
        var req = _a.req;
        var token = req.headers.authorization;
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err)
                    return done(false, 403, 'Not valid token');
                done(true);
            });
        }
    }
});
webSocketServer.on('connection', function (ws) {
    ws.on('message', function (m) {
    });
    ws.on("error", function (e) { return ws.send(e); });
    ws.send('Hi there, I am a WebSocket server');
});
server.listen(PORT, function () { return console.log("Server started on " + PORT); });
