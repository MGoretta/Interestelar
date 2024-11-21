import { Router, Request, Response } from 'express';
import db from '../models';

const { Mission, Company, Location, Rocket, RocketStatus, Price, MissionStatus, DateTime } = db;

const router = Router();

router.get('/missions', async (req: Request, res: Response) => {
  try {
    const missions = await Mission.findAll({
      include: [
        {
          model: Company,
          as: 'missionCompany', // Verifica que coincida con el alias en `associate`
        },
        {
          model: Rocket,
          as: 'missionRocket',
          include: [
            {
              model: RocketStatus,
              as: 'rocketStatus', // Verifica que coincida con el alias en `associate`
            },
            {
              model: Price,
              as: 'rocketPrice', // Verifica que coincida con el alias en `associate`
            },
          ],
        },
        {
          model: MissionStatus,
          as: 'missionStatus', // Verifica que coincida con el alias en `associate`
        },
        {
          model: DateTime,
          as: 'missionDateTime', // Asegúrate de que este alias coincida
        }
      ],
    });

    res.status(200).json(missions);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ error: 'An error occurred while fetching missions' });
  }
});

export default router;


