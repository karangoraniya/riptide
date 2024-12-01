
const EventModel = require("../models/event.model");
 const saveEventId = async (
  req,
  res
) => {
  const { objectId } = req.body;
  try {
    console.log("Received objectId:", objectId);
    const newEvent = new EventModel({ eventId: objectId });
    await newEvent.save();
    res.status(201).json({
      message: "Event ID saved successfully",
      success: true,
      id: objectId,
    });
  } catch (err) {
    console.error("Error saving eventId:", err); // Log the error message
    res.status(500).json({ message: err });
  }
};

 const getEventIds = async (
  req,
  res
)=> {
  try {
    const events = await EventModel.find({}, "eventId");
    const eventIds = events.map((event) => event.eventId);
    res.status(200).json(eventIds);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { saveEventId, getEventIds };