"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({ msg: "Token not correct" });
    }
    const actualToken = token.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(actualToken, config_1.default.JWT_TOKEN);
        req.email = decoded.email; // Assuming the decoded payload has an 'email' property
        next(); // Call next to continue the request processing chain
    }
    catch (error) {
        if (typeof error === "string") {
            return res.status(401).json({ msg: "Invalid token format" });
        }
        else {
            return res.status(401).json({ msg: "Invalid token" });
        }
    }
}
exports.default = authMiddleware;
