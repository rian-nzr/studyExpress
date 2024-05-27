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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const token_1 = require("../utils/token");
const prisma = new client_1.PrismaClient();
const singup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    let user = yield prisma.user.findFirst({ where: { email } });
    if (user) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }
    user = yield prisma.user.create({
        data: {
            name,
            email,
            password: (0, bcrypt_1.hashSync)(password, 10)
        }
    });
    res.json(user);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield prisma.user.findFirst({ where: { email } });
    if (!user) {
        res.status(404).json({ message: "user not foutd!!!" });
        return;
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        res.status(400).json({ message: "password wrong!!!" });
        return;
    }
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    const token = yield (0, token_1.generateAuthTokens)(userWithoutPassword);
    res.status(200).json({ user, token });
});
exports.default = { singup, login };
