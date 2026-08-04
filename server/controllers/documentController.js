import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  const doc = await Document.create({ ...req.body, user: req.user._id });
  res.status(201).json(doc);
};

export const getDocuments = async (req, res) => {
  const docs = await Document.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(docs);
};

export const updateDocument = async (req, res) => {
  const doc = await Document.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const deleteDocument = async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};