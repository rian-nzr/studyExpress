"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_controller_1.default.login);
authRouter.post('/singup', auth_controller_1.default.singup);
exports.default = authRouter;
