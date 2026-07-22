/**
 * @file booking-request.model.js
 * @description Mongoose Database Schema for Conversational Assessment & Mentor Booking Drafts.
 * 
 * RESPONSIBILITY:
 * Holds temporary and finalized booking intent payloads gathered through conversational AI interactions.
 * 
 * FUTURE PURPOSE:
 * Bridges the Mentee AI conversational agent with TheMentR's existing core assessment visit / booking workflows.
 * 
 * CONNECTIONS:
 * - Managed by `booking.service.js`.
 * - Links to `Conversation` and optionally to core `AssessmentVisit` / `ParentRequirement` entities.
 */

const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    studentGrade: {
      type: String,
      default: ''
    },
    preferredSubjects: [
      {
        type: String
      }
    ],
    parentName: {
      type: String,
      default: ''
    },
    contactPhone: {
      type: String,
      default: ''
    },
    cityLocation: {
      type: String,
      default: ''
    },
    preferredSchedule: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'confirmed', 'cancelled'],
      default: 'in_progress',
      index: true
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const BookingRequest = mongoose.model('AIBookingRequest', bookingRequestSchema);

module.exports = { BookingRequest, bookingRequestSchema };
