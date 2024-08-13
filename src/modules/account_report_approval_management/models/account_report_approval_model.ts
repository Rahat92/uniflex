import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'account-report-approvals';
const modelName = 'AccountReportApprovalModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;
    declare date: string;
    declare openning_balance: number;
    declare closing_balance: number;
    declare total_income: number;
    declare total_expence: number;
    declare approved_by: number;
    declare is_approved: boolean;
    declare not_approved_comment: string;
    declare approved_comment: string;

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
            date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            openning_balance: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            closing_balance: {
                type: DataTypes.INTEGER().UNSIGNED,
                allowNull: true
            },
            total_income: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            total_expence: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            approved_by: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },
            is_approved: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            not_approved_comment: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            approved_comment: {
                type: DataTypes.TEXT,
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
