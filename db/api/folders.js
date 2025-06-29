import express from "express";
import { getFolders, getFolder } from "../queries/folders.js";
import { createFile } from "../queries/files.js";
const foldersRouter = express.Router();

foldersRouter.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

foldersRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (/\D/.test(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const folder = await getFolder(id);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.json(folder);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch folder" });
  }
});

foldersRouter.post("/:id/files", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (/\D/.test(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const folder = await getFolder(id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { name, size } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }
    if (size === undefined || size === null) {
      return res.status(400).json({ error: "Missing required field: size" });
    }

    const newFile = await createFile(name, size, id);
    res.status(201).json(newFile);
  } catch (error) {
    console.error("Error in POST route:", error);
    res.status(500).json({ error: "Failed to create file" });
  }
});

export default foldersRouter;
