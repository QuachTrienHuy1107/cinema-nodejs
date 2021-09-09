const Cinema = require("../model/cinema/cinema.model");
const { Showtime } = require("../model/showtime/showtime.model");
const { Ticket } = require("../model/ticket/ticket.model");
const Mongoose = require("mongoose");
const User = require("../model/user/user.model");

// const Schema = mongoose.Schema;
/**
 * @Desc get all movie
 */
const createNewShowTime = async (req, res) => {
    const { movieId, cinemaId, time } = req.body;
    try {
        const findTime = await Showtime.findOne({ time });
        if (findTime) return res.status(404).json({ message: "Time is already" });
        const newShowtime = new Showtime({
            movie: movieId,
            cinema: cinemaId,
            time,
        });

        for (let i = 0; i < 10; i++) {
            const newTicket = new Ticket({
                seat_number: `seat-${i}`,
                type: "Normal",
            });
            await newShowtime.tickets.push(newTicket);
        }
        //Add showtime and movie to cinema

        const showtime = await newShowtime.save();

        await Cinema.findOneAndUpdate(
            { _id: cinemaId },
            { $push: { showtimes: showtime._id, movies: movieId } },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Create successfully", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const booking = async (req, res) => {
    const { showtimeId, arrayTickets } = req.body;
    const userId = req.userId;
    try {
        //tickets is array include ticketId, userId
        const showtime = await Showtime.findById(showtimeId);
        if (!showtime) return res.status(404).json({ message: "Showtime does not exist" });
        let check = -1;
        arrayTickets.forEach((ticket) => {
            const { ticketId } = ticket;
            for (let i = 0; i < showtime.tickets.length; i++) {
                if (showtime.tickets[i]._id.equals(ticketId)) {
                    check = i;
                    showtime.tickets[i].user = userId;
                    showtime.tickets[i].status = true;
                }
            }
        });
        await showtime.save();

        await User.findOneAndUpdate({ _id: userId }, { $push: { showtimes: showtimeId } }, { new: true });

        return res.status(200).json({ success: true, message: "Create booking successfully", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const findAllShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.find().populate("movie cinema tickets.user  ", "-_id");
        if (!showtime) return res.status(404).send("Showtime not found");

        res.status(200).json({ message: "All showtime", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getStatistic = async (req, res) => {
    try {
        const showtimes = await Showtime.aggregate([
            {
                $unwind: "$tickets",
            },

            {
                $match: {
                    "tickets.status": true,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    tickets: { $addToSet: "$tickets" },
                },
            },

            {
                $lookup: {
                    from: "cinema",
                    localField: "cinema",
                    foreignField: "_id",
                    as: "newCinema",
                },
            },
        ]);

        res.status(200).json({ showtimes });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createNewShowTime, findAllShowtime, booking, getStatistic };
