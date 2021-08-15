"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = __importDefault(require("querystring"));
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("../constants");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.getGoogleAuthURL = function () {
        var rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        var options = {
            redirect_uri: process.env.SERVER_ROOT_URI + "/" + constants_1.constants.redirectURI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ].join(" "),
        };
        return rootUrl + "?" + querystring_1.default.stringify(options);
    };
    AuthService.getTokens = function (_a) {
        var code = _a.code, clientId = _a.clientId, clientSecret = _a.clientSecret, redirectUri = _a.redirectUri;
        /*
         * Uses the code to get tokens
         * that can be used to fetch the user's profile
         */
        var url = "https://oauth2.googleapis.com/token";
        var values = {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
        };
        console.log(values, 'value');
        return axios_1.default
            .post(url, querystring_1.default.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (res) { return res.data; })
            .catch(function (error) {
            console.error("Failed to fetch auth tokens");
            throw new Error(error.message);
        });
    };
    // Fetch the user's profile with the access token and bearer
    AuthService.getGoogleUser = function (access_token, id_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(access_token, id_token);
                        return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + access_token, {
                                headers: {
                                    Authorization: "Bearer " + id_token,
                                },
                            })
                                .then(function (res) { return res.data; })
                                .catch(function (error) {
                                console.error("Failed to fetch user");
                                throw new Error(error.message);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    return AuthService;
}());
exports.default = AuthService;
