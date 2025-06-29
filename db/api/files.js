import express from "express";
import { getFiles } from "#db/queries/files";
const filesRouter = express.Router();

filesRouter.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default filesRouter;
