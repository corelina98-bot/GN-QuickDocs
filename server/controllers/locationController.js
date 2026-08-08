import Location from "../models/Location.js";

export const getLocations = async (req, res) => {
  try {
const locations = await Location.find({}).sort({ "name.en": 1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
