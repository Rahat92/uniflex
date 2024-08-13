import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as asset_model from './project_customer_information_model';
// import * as asset_model from '../../user_admin copy/models/asset_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let port = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';
let db_string = `mysql://${user}:${pass}@${host}:${port}/${database}`;

const sequelize = new Sequelize(db_string, {
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
    },
});

interface models {
    ProjectCustomerInformationModel: typeof asset_model.DataModel;
    // Project: typeof asset_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const ProjectCustomerInformationModel = asset_model.init(sequelize);
    // const Project = asset_model.init(sequelize);

    await sequelize.sync();

    // User.hasMany(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'project-customer-informations',
    // });

    // User.hasOne(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'project',
    // });

    // Project.belongsToMany(User, {
    //     through: 'project_user',
    // });
    // User.belongsToMany(Project, {
    //     through: 'project_user',
    // });

    let models: models = {
        ProjectCustomerInformationModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
