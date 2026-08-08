# TODO: Residence Certificate Instruction Sheet Feature

## Backend
1. [x] Add `multer` and `pdfkit` to `server/package.json`.
2. [x] Create `server/models/InstructionSheet.js` (metadata model).
3. [x] Create `server/services/gridfsService.js` (GridFS helpers).
4. [x] Create `server/controllers/instructionSheetController.js` (GET stream, POST upload, DELETE).
5. [x] Create `server/routes/instructionSheetRoutes.js` (public GET, upload/delete).
6. [x] Mount routes in `server/server.js`.
7. [x] Create `server/seed/seedInstructionSheets.js` (idempotent seed) + add `seed` script.
8. [x] Install server dependencies.

## Frontend
9. [x] Add `instructionSheet: true` to ALL 12 services in `servicesData.js`.
10. [x] Create `client/src/services/instructionSheetService.js`.
11. [x] Create `client/src/components/InstructionSheetButton.jsx`.
12. [x] Create `client/src/components/InstructionSheetModal.jsx`.
13. [x] Wire button + modal into `DocumentChecklist.jsx`.
14. [x] Add CSS to `DocumentChecklist.css`.
15. [x] Add `instructionSheet` strings to `en.json`, `si.json`, `ta.json`.

## Testing
16. [x] Run seed (idempotent) - all 12 PDFs generated/stored; second run skips duplicates.
17. [x] Run server + client.
18. [x] Verify all requirement checklist items.
</content>
