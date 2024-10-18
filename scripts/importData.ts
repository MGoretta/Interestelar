import fs from 'fs';
import csv from 'csv-parser';
import db from '../models'; 

interface SpaceMission {
  Rocket: string;
  Mission: string;
  Company: string; 
  DateTime: string; 
  ComplexLaunch: string; 
  LaunchCenter: string;  
  State: string;        
  Country: string;      
  MissionStatus: string; 
  RocketStatus: string;// Si también necesitas esto
  // Otros campos...
}

const results: SpaceMission[] = [];

fs.createReadStream('data/space_missions_2 Fer.csv')
  .pipe(csv())
  .on('data', (data: SpaceMission) => results.push(data))
  .on('end', async () => {
    try {
      console.log(`Total de misiones a procesar: ${results.length}`);
      for (const missionData of results) {
        // Busca o crea la empresa relacionada

        // Validación para asegurarse de que el nombre de la misión esté definido
        if (!missionData.Mission) { // Cambia 'Mission' por el nombre correcto de la propiedad si es diferente
          console.error('El nombre de la misión no está definido:', missionData);
          continue; // Omite esta iteración si no hay nombre
        }

        const [company] = await db.Company.findOrCreate({
          where: { name: missionData.Company },
        });

        // Crea la dirección concatenada
        const fullAddress = `${missionData.ComplexLaunch}, ${missionData.LaunchCenter}, ${missionData.State}, ${missionData.Country}`;

        // Inserta el nuevo Location
        const location = await db.Location.create({
          address: fullAddress,
          companyId: company.id // Vincula la locación con la empresa
        });

        // Busca o crea la misión relacionada
        const [mission] = await db.Mission.findOrCreate({
          where: { name: missionData.Mission },
          defaults: { companyId: company.id } 
        });

        // Inserta el cohete y vincúlalo con la empresa y misión correspondientes
        const rocket = await db.Rocket.create({
          name: missionData.Rocket,
          missionId: mission.id,
          companyId: company.id 
        });

        // Inserta el estado de la misión en 'MissionStatus'
        await db.MissionStatus.create({
          status: missionData.MissionStatus, // Si también necesitas esto
          missionId: mission.id // Vincula el estado con la misión correspondiente
        });

        // Inserta el DateTime en la tabla 'DateTimes'
        await db.DateTime.create({
          dateandtime: missionData.DateTime,
          missionId: mission.id 
        });

        // Inserta el estado del cohete en 'RocketStatus'
        await db.RocketStatus.create({
          status: missionData.RocketStatus, // Inserta el estado del cohete desde el CSV
          rocketId: rocket.id // Vincula el estado con el cohete correspondiente
        });
      }
      console.log('Datos insertados correctamente');
    } catch (error) {
      console.error('Error al insertar datos: ', error);
    }
  });





// import fs from 'fs';
// import csv from 'csv-parser';
// import db from '../models';  // Asegúrate de importar tus modelos

// interface SpaceMission {
//   Rocket: string;
//   Mission: string;
//   Company: string; // Campo de empresa
//   // Otros campos...
// }

// const results: SpaceMission[] = [];

// fs.createReadStream('data/space_missions_2 Fer.csv')
//   .pipe(csv())
//   .on('data', (data: SpaceMission) => results.push(data))
//   .on('end', async () => {
//     try {
//       for (const missionData of results) {
//         // Busca o crea la empresa relacionada
//         const [company] = await db.Company.findOrCreate({
//           where: { name: missionData.Company }, // Asegúrate de que 'Company' es el campo correcto en el CSV
//         });

//         // Busca o crea la misión relacionada
//         const [mission] = await db.Mission.findOrCreate({
//           where: { name: missionData.Mission },
//           defaults: { companyId: company.id } // Vincula la misión con la empresa creada
//         });

//         // Inserta el cohete y vincúlalo con la empresa y misión correspondientes
//         await db.Rocket.create({
//           name: missionData.Rocket,
//           missionId: mission.id,  // Vincula el cohete con la misión
//           companyId: company.id   // Vincula el cohete con la empresa
//         });
//       }
//       console.log('Datos insertados correctamente');
//     } catch (error) {
//       console.error('Error al insertar datos: ', error);
//     }
//   });

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


