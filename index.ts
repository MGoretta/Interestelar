import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import {mission} from './seeders/mission';
import {rocket} from './seeders/rocket';

const createRocket = () => {
    rocket.map(rock => {
        db.Rocket.create(rock)
    })
}
createRocket();
 
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})