import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Location from "./models/Location.js";
import { locations } from "./data/locationSeed.js";

dotenv.config();

const log = (msg) => {
  console.log(msg);
  fs.appendFileSync("seed_log.txt", msg + "\n", "utf8");
};

const seedLocations = async () => {
  try {
    fs.writeFileSync("seed_log.txt", "", "utf8");
    await mongoose.connect(process.env.MONGO_URI);
    log("MongoDB Connected");
    log(`DB name: ${mongoose.connection.db.databaseName}`);

    // Remove existing location data to avoid duplicate unique-key errors.
    await Location.deleteMany({});
    log("Cleared existing locations");

    const inserted = await Location.insertMany(locations);
    log(`Inserted ${inserted.length} provinces:`);
    inserted.forEach((p) => {
      log(`  - ${p.name.en}: ${p.districts.length} districts`);
      p.districts.forEach((d) => {
        if (d.divisions && d.divisions.length > 0) {
          log(`      ${d.name.en}: ${d.divisions.length} divisions`);
        }
      });
    });

    await mongoose.connection.close();
    log("Seed complete. Connection closed.");
    process.exit(0);
  } catch (error) {
    log(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedLocations();
