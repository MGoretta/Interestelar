import fs from 'fs';
import csv from 'csv-parser';
import db from '../models';  // Asegúrate de importar tus modelos

interface SpaceMission {
  Rocket: string;
  Mission: string;
  Company: string; // Añadido para incluir la empresa
  // Otros campos...
}

const results: SpaceMission[] = [];

fs.createReadStream('data/space_missions_2 Fer.csv')
  .pipe(csv())
  .on('data', (data: SpaceMission) => results.push(data))
  .on('end', async () => {
    try {
      for (const missionData of results) {
        // Busca o crea la empresa relacionada
        const [company] = await db.Company.findOrCreate({
          where: { name: missionData.Company }, // Asegúrate de que 'Company' sea el nombre correcto del campo en el CSV
        });

        // Busca o crea la misión relacionada
        const [mission] = await db.Mission.findOrCreate({
          where: { name: missionData.Mission },
          defaults: { companyId: company.id } // Vincula la misión con la empresa creada
        });

        // Solo inserta el cohete si la misión se creó correctamente
        if (mission) {
          await db.Rocket.create({
            name: missionData.Rocket,
            missionId: mission.id  // Usa el ID de la misión encontrada/creada
          });
        }
      }
      console.log('Datos insertados correctamente');
    } catch (error) {
      console.error('Error al insertar datos: ', error);
    }
  });



// INSERTA ROCKET Y MISSION CORRECTAMENTE
// import fs from 'fs';
// import csv from 'csv-parser';
// import db from '../models';  // Asegúrate de importar tus modelos

// interface SpaceMission {
//   Rocket: string;
//   Mission: string;
//   // Otros campos...
// }

// const results: SpaceMission[] = [];

// fs.createReadStream('data/space_missions_2 Fer.csv')
//   .pipe(csv())
//   .on('data', (data: SpaceMission) => results.push(data))
//   .on('end', async () => {
//     try {
//       for (const missionData of results) {
//         // Busca o crea la misión relacionada
//         const mission = await db.Mission.findOrCreate({
//           where: { name: missionData.Mission },
//         });

//         // Inserta el cohete relacionado con esa misión
//         await db.Rocket.create({
//           name: missionData.Rocket,
//           missionId: mission[0].id  // Usa el ID de la misión encontrada/creada
//         });
//       }
//       console.log('Datos insertados correctamente');
//     } catch (error) {
//       console.error('Error al insertar datos: ', error);
//     }
//   });


// AQUÍ DEVUELVE CON ERROR
// import fs from 'fs';
// import csv from 'csv-parser';

// interface SpaceMission {
//   ComplexLaunch: string;
//   LaunchCenter: string;
//   State: string;
//   Country: string;
//   Date: string;
//   Time: string;
//   Rocket: string;
//   Mission: string;
//   RocketStatus: string;
//   Price: string;
//   MissionStatus: string;
//   DateTime: string;
// }

// const results: SpaceMission[] = [];

// fs.createReadStream('data/space_missions_2 Fer.csv')
//   .pipe(csv())
//   .on('data', (data: SpaceMission) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//     // Aquí puedes agregar el código para insertar los datos en la base de datos.
//   });


