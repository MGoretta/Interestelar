import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import {mission} from './seeders/mission';
import {rocket} from './seeders/rocket';
import allMissionsRoute from './routes/allMissionsRoute'; // Importar la ruta

// Middleware para parsear JSON
app.use(express.json()); 

app.use('/api', allMissionsRoute); // Usar la ruta de misiones

const createRocket = async () => {
    try {
      // Obtener una misión existente de la base de datos
      const mission = await db.Mission.findOne(); // Ajusta la consulta si necesitas un id específico
  
      if (mission) {
        rocket.map(async rock => {
          await db.Rocket.create({
            ...rock,
            missionId: mission.id // Asignar un missionId existente
          });
        });
      } else {
        console.log('No se encontraron misiones en la base de datos. Verifica si la importación del CSV fue exitosa.');
      }
    } catch (error) {
      console.error('Error al crear Rockets:', error);
    }
  };
  
  createRocket();
  
 
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})