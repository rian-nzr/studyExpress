"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Application work!');
    console.log('kk');
});
app.listen(secrets_1.PORT, () => {
    console.log(`Application started on port ${secrets_1.PORT}!`);
});
