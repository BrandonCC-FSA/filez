import express from "express";
import filesRouter from "./db/api/files.js";
import foldersRouter from "./db/api/folders.js";
const app = express();

app.use(express.json());
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

export default app;
