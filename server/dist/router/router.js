"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const pollRoutes_1 = __importDefault(require("./routes/pollRoutes"));
exports.routes = express_1.default.Router();
// Root route definition
exports.routes.get('/', (req, res) => {
    // Sends a simple response for the root route
    res.send('main api route');
});
// Use the defined routes
exports.routes.use('/user', userRoutes_1.default);
exports.routes.use('/polls', pollRoutes_1.default);
