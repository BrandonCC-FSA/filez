import db from "#db/client";

export async function getFolders() {
  const sql = `SELECT * FROM folders;`;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export const createFolder = async (folderName) => {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;

  const { rows: createdFolder } = await db.query(sql, [folderName]);
  return createdFolder[0];
};

export const getFolder = async (id) => {
  const sql = `
    SELECT 
      folders.*,
      (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
      ) AS files
    FROM folders 
    WHERE folders.id = $1
  `;

  const {
    rows: [folder],
  } = await db.query(sql, [id]);

  if (!folder) {
    return undefined;
  }

  if (folder.files === null) {
    folder.files = [];
  }

  return folder;
};
