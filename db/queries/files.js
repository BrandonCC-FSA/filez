import db from "#db/client";

export const createFile = async (fileName, fileSize, folderId) => {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const {
    rows: [createdFile],
  } = await db.query(sql, [fileName, fileSize, folderId]);
  return createdFile;
};

export const getFiles = async () => {
  const sql = `
    SELECT 
      files.id,
      files.name,
      files.size,
      files.folder_id,
      folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id
  `;
  const { rows: allFilesWithFolderNamer } = await db.query(sql);
  return allFilesWithFolderNamer;
};
