import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'account-categories';
const modelName = 'AccountCategoryModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type type = 'income' | 'expence';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare title: string;
    declare description: string;

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
            title: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            description: {
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
