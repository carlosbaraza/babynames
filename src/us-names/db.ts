import sqlite3 from "sqlite3";
import path from "path";

// open the database

export const db = new sqlite3.Database(
  path.join(__dirname, "./names.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the names database.");
  }
);

export async function dbClose() {
  return new Promise<void>(async (resolve, reject) =>
    db.close((err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      console.log("Close the database connection.");
      resolve();
    })
  );
}
