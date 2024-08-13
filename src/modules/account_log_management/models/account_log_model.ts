import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'account-logs';
const modelName = 'AccountLogModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type type = 'income' | 'expence';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare account_id: number;
    declare account_number_id: number;
    declare uid: string;
    declare date: string;
    declare amount: number;
    declare user_id: boolean;
    declare type: type;

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
            account_id: {
                type: DataTypes.INTEGER().UNSIGNED,
                allowNull: true,
            },
            account_number_id: {
                type: DataTypes.INTEGER().UNSIGNED,
                allowNull: true,
            },
            uid: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            amount: {
                type: DataTypes.INTEGER().UNSIGNED,
                allowNull: true
            },
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM('income', 'expence'),
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
