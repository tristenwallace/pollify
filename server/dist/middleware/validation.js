"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
// Middleware array to validate registration data
exports.validateRegistration = [
    // Validate the 'username' field: it should be a non-empty string
    (0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'),
    // Validate the 'password' field: it should be at least 6 characters long
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    // Validate the 'name' field: it should be a non-empty string
    (0, express_validator_1.body)('name').isString().withMessage('Name must be a string.'),
    // Custom middleware to check the result of the validations above
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req); // Collect errors from prior validations
        // If validation errors exist, return them in an array with a 400 status
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Continue to the next middleware if validation is successful
    },
];
