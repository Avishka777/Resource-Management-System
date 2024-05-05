const Sportsbooking = require('../models/sportsbooking.model.js');
const { errorHandler } = require('../utils/error.js');

// Route to Booking Resource
exports.create = async (req, res, next) => {
    
    try {
        const { resourceName, email, mobile, noOfResource, date, startTime, endTime } = req.body;
        
        // Check if all required fields are provided
        if (!resourceName || !email || !mobile || !date || !startTime || !endTime) {
            return next(errorHandler(400, 'Missing required fields.'));
        }

        const booking = new Sportsbooking({
            resourceName,
            email,
            mobile,
            noOfResource,
            date,
            startTime,
            endTime
        });

        // Check if the specified date and time slot is already booked
        const isAvailable = await Sportsbooking.findOne({
            resourceName,
            date,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } },
                        { endTime: { $lte: endTime } }
                    ]
                }
            ]
        });

        if (isAvailable) {
            return next(errorHandler(400, 'The Resource is Not Available At the Specified Time.'));
        }

        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        next(error);
    }
};



// Route to Get All Resource Booking
exports.getAll = async (req, res, next) => {
    try {
        const sportsbookings = await Sportsbooking.find();
        res.status(200).json(sportsbookings);
    } catch (error) {
        next(error);
    }
};


// Route to Get Resource Booking By ID
exports.getByID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const sportsbooking = await Sportsbooking.findById(id);
        if (!sportsbooking) {
            return next(errorHandler(404, 'Resource Booking Not Found.'));
        }
        res.status(200).json(sportsbooking);
    } catch (error) {
        next(error);
    }
};

// Route to Update Resource Booking
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { resourceName, mobile, email, noOfResource, date: dateString, startTime, endTime } = req.body;
    
    try {
        const sportsbooking = await Sportsbooking.findById(id);
        
        if (!sportsbooking) {
            return next(errorHandler(403, 'Resource Booking Not Found.'));
        }

        // Check if all required fields are provided
        if (!dateString || !startTime || !endTime) {
            return next(errorHandler(400, 'Missing required fields.'));
        }
        
        // Parse date string into a Date object
        const date = new Date(dateString);
        
        // Check if the updated booking overlaps with existing bookings
        const isAvailable = await Sportsbooking.findOne({
            resourceName,
            date,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } },
                        { endTime: { $lte: endTime } }
                    ]
                }
            ],
            _id: { $ne: id } // Exclude the current booking from the check
        });
        
        if (isAvailable) {
            return next(errorHandler(400, 'The Resource is Not Available At the Specified Time.'));
        }
        
        // Update booking details
        sportsbooking.resourceName = resourceName;
        sportsbooking.mobile = mobile;
        sportsbooking.email = email;
        sportsbooking.noOfResource = noOfResource;
        sportsbooking.date = date;
        sportsbooking.startTime = startTime;
        sportsbooking.endTime = endTime;
        
        const updatedSportsbooking = await sportsbooking.save();
        res.status(200).json(updatedSportsbooking);
    } catch (error) {
        next(error);
    }
};



// Route to Delete Resource Booking
exports.remove = async (req, res, next) => {
    
    const { id } = req.params;
    try {
        const sportsbooking = await Sportsbooking.findById(id);
        if (!sportsbooking) {
            return next(errorHandler(404, 'Resource Booking Not Found.'));
        }
        await sportsbooking.deleteOne();
        res.status(200).json({ message: 'Resource Booking Deleted Successfully.' });
    } catch (error) {
        next(error);
    }
};