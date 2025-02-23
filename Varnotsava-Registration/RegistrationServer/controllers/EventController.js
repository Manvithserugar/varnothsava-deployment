const mongoose = require("mongoose");
const Event = require("../models/Event");
const baseURL = "https://varnauthsava.vercel.app/api/v1";

const fetchEvents = async (req, res) => {
  try {
    const events = await Event.find().lean();
    if (!events.length) {
      return res.status(404).send({ message: "No events found" });
    }
    events.map((event) => {
      if (event.imgID) {
        event.img = `${baseURL}/image/${event.imgID}`;
      } else {
        console.error("image not found");
      }
      delete event.imgID;
      delete event.__v;
      return event;
    });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { fetchEvents };
