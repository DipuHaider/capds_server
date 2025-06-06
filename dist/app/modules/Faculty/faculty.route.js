"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.FacultyControllers.getSingleFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.updateFacultyValidationSchema), faculty_controller_1.FacultyControllers.updateFaculty);
router.delete('/:id', faculty_controller_1.FacultyControllers.deleteFaculty);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.FACULTY), faculty_controller_1.FacultyControllers.getAllFaculties);
exports.FacultyRoutes = router;
