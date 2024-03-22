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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authmiddleware_1 = __importDefault(require("../authmiddleware"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Signup zod schema
const signupSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
// signin Schema
const signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
// insert Todos schema
const insertSchema = zod_1.default.object({
    userId: zod_1.default.number(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
// Signup Route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const success = signupSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({ msg: "fails zod validation" });
    }
    else {
        const userExists = yield prisma.users.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!userExists) {
            yield prisma.users.create({
                data: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                },
            });
            res.json({ msg: "User created successfully" });
        }
        else {
            res.status(411).json({ msg: "Inputs not correct" });
        }
    }
}));
// signin route
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({ msg: "fails zod validation" });
    }
    else {
        const userExists = yield prisma.users.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!userExists) {
            res
                .status(401)
                .json({ msg: "You are not signed up pls, make account first" });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ email: req.body.email }, config_1.default.JWT_TOKEN);
            res.status(200).json({ token: token });
        }
    }
}));
// Put todos route
router.put("/insert", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = insertSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({ msg: "fails zod validation" });
    }
    else {
        yield prisma.todos.create({
            data: {
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.description,
            },
        });
        res.json({ msg: "Todos created successfully!" });
    }
}));
router.post("/fetch", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todos.findMany({
        where: {
            userId: req.body.userId,
        },
    });
    res.json({ msg: todos });
}));
exports.default = router;
