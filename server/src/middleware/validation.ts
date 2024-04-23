import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware array to validate registration data
export const validateRegistration = [
  // Validate the 'username' field: it should be a non-empty string
  body('username').isString().notEmpty().withMessage('Username is required'),

  // Validate the 'password' field: it should be at least 6 characters long
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Validate the 'name' field: it should be a non-empty string
  body('name').isString().withMessage('Name must be a string.'),

  // Validate the 'avatarURL' field: if it exists, it should be a url
  body('avatarURL')
    .optional()
    .isURL()
    .withMessage('Avatar URL must be a valid URL.'),

  // Custom middleware to check the result of the validations above
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); // Collect errors from prior validations

    // If validation errors exist, return them in an array with a 400 status
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); // Continue to the next middleware if validation is successful
  },
];
