import mongoose from "mongoose";

/**
 * Thin wrapper around MongoDB GridFS (via mongoose's native GridFSBucket).
 *
 * GridFS stores the PDF binary across `fs.files` + `fs.chunks` collections.
 * Metadata about each instruction sheet lives in the `InstructionSheet`
 * model (which holds the GridFS `fileId`). This keeps large binaries out of
 * normal documents while still letting us stream them back to the client.
 *
 * IMPORTANT: GridFSBucket is lazy — it reads the underlying connection at the
 * time it is called, so it works with the already-open mongoose connection.
 */

let bucketCache = null;

/** Get (and cache) a GridFSBucket bound to the current mongoose connection. */
export function getBucket() {
  if (!bucketCache) {
    bucketCache = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "instructionSheets",
    });
    // Drop the cache if the connection reconnects, so we always use a live
    // connection object.
    mongoose.connection.on("reconnected", () => {
      bucketCache = null;
    });
  }
  return bucketCache;
}

/**
 * Store a PDF buffer into GridFS and return the generated file id.
 *
 * @param {Buffer} buffer  PDF binary data
 * @param {Object} meta    { filename, contentType }
 * @returns {Promise<mongoose.Types.ObjectId>} the GridFS file id
 */
export async function storeInstructionSheet(buffer, { filename, contentType }) {
  const bucket = getBucket();
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, { contentType });
    // The GridFS write stream exposes its generated id up-front; the `finish`
    // event may not pass the file object in all driver versions, so resolve
    // with `uploadStream.id` (safe across versions).
    uploadStream.on("error", reject);
    uploadStream.on("finish", () => resolve(uploadStream.id));
    uploadStream.end(buffer);
  });
}

/**
 * Stream a GridFS file to a writable (e.g. the Express response).
 *
 * @param {mongoose.Types.ObjectId} fileId  GridFS file id
 * @param {import("stream").Writable} output  destination stream
 * @returns {Promise<{ length: number }>}
 */
export async function streamInstructionSheet(fileId, output) {
  const bucket = getBucket();
  return new Promise((resolve, reject) => {
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.on("error", reject);
    downloadStream.on("end", () => resolve());
    downloadStream.pipe(output);
  });
}

/**
 * Delete a GridFS file by id (used when replacing/removing a sheet).
 * @param {mongoose.Types.ObjectId} fileId
 */
export async function deleteInstructionSheet(fileId) {
  const bucket = getBucket();
  await bucket.delete(fileId);
}
