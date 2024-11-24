"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_seeder = void 0;
const prisma_1 = require("@/database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_seeder = async () => {
    await prisma_1.prisma.user.create({
        data: {
            id: 1,
            name: "Coordenador",
            email: "coordenador@mediotec.com",
            password: bcrypt_1.default.hashSync("12345678", bcrypt_1.default.genSaltSync()),
            type: "Coordinator",
        }
    });
    console.log("Seeder de Usuario Concluida");
};
exports.user_seeder = user_seeder;
