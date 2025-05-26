"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// Middleware parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS Configuration
app.use((0, cors_1.default)({
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'https://capds-server.vercel.app',
        'https://capdsadmin.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send(`
        <h1>CAPDS_Server API! 😃</h1>
        <p>Thank you for visiting this API.💫 This is the entry point for our service. ✨</p>
    `);
});
//Not Found
app.use(notFound_1.default);
app.use(globalErrorhandler_1.default);
exports.default = app;
