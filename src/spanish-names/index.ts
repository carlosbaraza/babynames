// Names from https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177009&menu=resultados&idp=1254734710990

import csv from "csv-parser";
import fs from "fs";
import path from "path";

type SpanishName = {
  order: number;
  name: string;
  frequency: number;
  avgAge: number;
};

export const spanishNamesMale = new Promise<SpanishName[]>((resolve) => {
  let results: SpanishName[] = [];
  fs.createReadStream(path.join(__dirname, "nombres_por_edad_media_hombres.csv"))
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        order: parseInt(data.Orden),
        name: data.Nombre.trim().toLowerCase(),
        frequency: parseInt(data.Frecuencia.trim().replace(",", "")),
        avgAge: parseFloat(data["Edad Media (*)"]),
      });
    })
    .on("end", () => {
      resolve(results);
    });
});
