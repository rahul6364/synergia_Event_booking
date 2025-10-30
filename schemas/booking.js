const mongoose = require('mongoose');

// Create the schema structure
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  event: {
    type: String,
    required: [true, 'Event is required'],
    trim: true
  },
  ticketType: {
    type: String,
    trim: true,
    default: 'Standard'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

// Export the model so it can be used in Express routes
module.exports = Booking;