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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthTokens = void 0;
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const salt = "1234abcd";
const generateToken = (user, exp, secret = salt) => {
    const payload = {
        user: user,
        iat: (0, moment_1.default)().unix(),
        exp: exp.unix(),
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, moment_1.default)().add(7200, "minutes");
    const accessToken = generateToken(user, accessTokenExpires, salt);
    return {
        token: accessToken,
        exp: accessTokenExpires.toDate(),
    };
});
exports.generateAuthTokens = generateAuthTokens;
