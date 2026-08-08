import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "./models/Location.js";
import { locations } from "./data/locationSeed.js";

dotenv.config();

const seedLocations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Remove existing location data to avoid duplicate unique-key errors.
    await Location.deleteMany({});
    console.log("Cleared existing locations");

    const inserted = await Location.insertMany(locations);
    console.log(`Inserted ${inserted.length} provinces:`);
    inserted.forEach((p) =>
      console.log(`  - ${p.name}: ${p.districts.join(", ")}`)
    );

    await mongoose.connection.close();
    console.log("Seed complete. Connection closed.");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedLocations();
