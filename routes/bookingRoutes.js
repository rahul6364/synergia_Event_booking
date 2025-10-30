const express=require('express')
const booking= require('../schemas/booking.js');

const router=express.Router();

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { name, email, event, ticketType } = req.body;

        if (!name || !email || !event) {
            return res.status(400).json({ message: "name, email, event are required" });
        }
        const existing = await booking.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "A booking with this email already exists" });
        }

        const newBooking = new booking({ name, email, event, ticketType });
        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ message: "Error creating booking", error });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const allBookings = await booking.find();
        return res.status(200).json(allBookings);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching bookings", error });
    }
});

// Search booking by email - place BEFORE id route to avoid conflict
router.get('/search', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        const book = await booking.findOne({ email });
        if (!book) {
            return res.status(404).json({ message: "No booking found for this email" });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Error searching booking", error });
    }
});

// Filter bookings by event - place BEFORE id route to avoid conflict
router.get('/filter', async (req, res) => {
    try {
        const { event } = req.query;
        if (!event) {
            return res.status(400).json({ message: "event is required" });
        }
        const books = await booking.find({ event });
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No bookings found for this event" });
        }
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Error filtering bookings", error });
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const Booking = await booking.findById(req.params.id);
        if (!Booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json(Booking);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching booking", error });
    }
});
// Update booking by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, event, ticketType } = req.body;
        const updatedBooking = await booking.findByIdAndUpdate(
            req.params.id,
            { name, email, event, ticketType },
            { new: true, runValidators: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        return res.status(500).json({ message: "Error updating booking", error });
    }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});



module.exports=router;