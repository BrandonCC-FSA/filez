import db from "#db/client";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  console.log("CREATING FOLDERS");
  const test1 = await createFolder("Test Folder 1");
  const test2 = await createFolder("Test Folder 2");
  const test3 = await createFolder("Test Folder 3");
  console.log("FOLDERS CREATED");

  console.log("CREATING FILES");
  await createFile("Test File 1", 10, test1.id);
  await createFile("Test File 2", 10, test1.id);
  await createFile("Test File 3", 10, test1.id);
  await createFile("Test File 4", 10, test1.id);
  await createFile("Test File 5", 10, test1.id);

  await createFile("Test File 6", 10, test2.id);
  await createFile("Test File 7", 10, test2.id);
  await createFile("Test File 8", 10, test2.id);
  await createFile("Test File 9", 10, test2.id);
  await createFile("Test File 10", 10, test2.id);

  await createFile("Test File 11", 10, test3.id);
  await createFile("Test File 12", 10, test3.id);
  await createFile("Test File 13", 10, test3.id);
  await createFile("Test File 14", 10, test3.id);
  await createFile("Test File 15", 10, test3.id);
  console.log("FILES CREATED");
}
