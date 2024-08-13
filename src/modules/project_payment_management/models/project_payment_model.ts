import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'project-payments';
const modelName = 'ProjectPaymentModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type type = 'booking_money' | 'down_payments' | 'installments';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare account_log_id: number;
    declare user_id: number;
    declare date: string;
    declare type: type;
    declare project_id: number;
    declare reference_user_id: number;
    declare amount: number;

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
            account_log_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM('booking_money', 'down_payments', 'installments'),
                defaultValue: 'booking_money',
            },
            project_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            reference_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            amount: {
                type: DataTypes.INTEGER().UNSIGNED,
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
