import { db } from "./db";

export async function getNames(): Promise<
  Array<{ id: number; name: string; sex: "M" | "F"; total_count: number }>
> {
  return new Promise(async (resolve, reject) =>
    db.serialize(async () => {
      db.all(
        `
            SELECT *
            FROM names n
            JOIN 
            (
                select name_id, sum("count") "total_count"
                from name_decades nd
                group by nd.name_id
            ) nd
            ON n.id = nd.name_id
          `,
        (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          resolve(rows);
        }
      );
    })
  );
}
