import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'project-customers';
const modelName = 'ProjectCustomerModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare project_id: number;
    declare user_id: number;
    declare date: string;
    declare total_share: number;
    declare have_to_pay_amount: boolean;
    declare paid: boolean;
    declare reference_user_id: number;

    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            project_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            total_share: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            have_to_pay_amount: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            paid: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            reference_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },   
            status: {
                type: DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
            },
            creator: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: null,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
