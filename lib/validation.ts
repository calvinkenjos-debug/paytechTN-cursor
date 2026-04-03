/**
 * Input validation utilities for Convex mutations
 * Prevents XSS, SQL Injection (via Convex's type system), and invalid data
 */

import Joi from 'joi';
import { escape } from 'html-escaper';

// Email validation schema
export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } }) // Allow all TLDs
  .max(254) // RFC 5321
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'string.max': 'Email is too long'
  });

// Phone number validation (international format)
export const phoneSchema = Joi.string()
  .pattern(/^\+?[1-9]\d{1,14}$/) // E.164 format
  .required()
  .messages({
    'string.pattern.base': 'Please provide a valid phone number (e.g., +919999999999)',
    'string.empty': 'Phone number is required'
  });

// URL validation (LinkedIn, etc.)
export const urlSchema = Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .max(2048) // Maximum practical URL length
  .required()
  .messages({
    'string.uri': 'Please provide a valid URL',
    'string.empty': 'URL is required',
    'string.max': 'URL is too long'
  });

// Name validation (prevents XSS)
export const nameSchema = Joi.string()
  .min(2)
  .max(100)
  .pattern(/^[a-zA-Z\s\-'.]+$/) // Only letters, spaces, hyphens, apostrophes, dots
  .required()
  .messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be less than 100 characters',
    'string.pattern.base': 'Name can only contain letters, spaces, hyphens, and apostrophes',
    'string.empty': 'Name is required'
  });

// Role/job title validation
export const roleSchema = Joi.string()
  .min(2)
  .max(150)
  .pattern(/^[a-zA-Z0-9\s\-,./()&]+$/) // Alphanumeric + common punctuation
  .required()
  .messages({
    'string.min': 'Role must be at least 2 characters',
    'string.max': 'Role must be less than 150 characters',
    'string.pattern.base': 'Role contains invalid characters',
    'string.empty': 'Role is required'
  });

// Session ID validation (alphanumeric + hyphens only)
export const sessionIdSchema = Joi.string()
  .pattern(/^[a-z0-9\-]+$/)
  .max(100)
  .required()
  .messages({
    'string.pattern.base': 'Invalid session ID format',
    'string.empty': 'Session ID is required'
  });

/**
 * Complete signup validation schema
 */
export const signupSchema = Joi.object({
  fullName: nameSchema,
  email: emailSchema,
  whatsappNumber: phoneSchema,
  linkedinUrl: urlSchema,
  role: roleSchema
});

/**
 * Resource request validation schema
 */
export const resourceRequestSchema = Joi.object({
  email: emailSchema,
  sessionId: sessionIdSchema,
  sessionTitle: Joi.string().min(2).max(200).required()
});

/**
 * Sanitize string for safe HTML output (XSS prevention)
 * Use this before embedding user input in emails or HTML
 */
export function sanitizeForHTML(input: string): string {
  return escape(input);
}

/**
 * Sanitize string for safe text output (removes potential control characters)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .trim();
}

/**
 * Validate and sanitize signup data
 */
export function validateSignup(data: unknown) {
  const { error, value } = signupSchema.validate(data, {
    abortEarly: false, // Return all errors
    stripUnknown: true // Remove unknown fields
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(', '));
  }

  return value;
}

/**
 * Validate and sanitize resource request data
 */
export function validateResourceRequest(data: unknown) {
  const { error, value } = resourceRequestSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(', '));
  }

  return value;
}

/**
 * Rate limiting helper (for client-side)
 * Returns true if action should be allowed
 */
export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const storageKey = `rateLimit_${key}`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    const data = stored ? JSON.parse(stored) : { count: 0, resetAt: now + windowMs };

    if (now > data.resetAt) {
      // Window expired, reset
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        resetAt: now + windowMs
      }));
      return true;
    }

    if (data.count >= maxAttempts) {
      return false; // Rate limit exceeded
    }

    // Increment count
    data.count++;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch {
    // If localStorage fails, allow (fail open for UX)
    return true;
  }
}
