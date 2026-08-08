# TODO: Add Provinces & Districts to GN Division List (from MongoDB)

## Steps to Complete

1. [x] Server: Create `models/Location.js` — province model with embedded `districts` array.
2. [x] Server: Create `data/locationSeed.js` — all 9 provinces and their districts.
3. [x] Server: Create `controllers/locationController.js` — `getLocations`.
4. [x] Server: Create `routes/locationRoutes.js` — `GET /api/locations`.
5. [x] Server: Register `locationRoutes` in `server.js`.
6. [x] Server: Create `seed.js` script to insert provinces + districts into MongoDB.
7. [x] Run seed script to populate MongoDB.
8. [x] Client: Update `GNDivisionList.jsx` to fetch provinces from API and filter districts by selected province.
9. [x] Test: Build the client and verify the flow.
