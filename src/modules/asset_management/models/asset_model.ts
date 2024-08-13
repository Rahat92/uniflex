import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'assets';
const modelName = 'AssetModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare asset_category_id: number;
    declare title: string;

    declare image?: string;
    declare amount?: number;
    declare invoice_picture?: string;
    declare purchase_date?: string;
    declare is_available?: boolean;
    declare purchase_price?: number;

    declare depreciation_price?: number;

    declare depreciation_period?: string;
    declare depreciation_count?: number;
    declare owner_id?: number;
    declare purchased_by?: number;

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
            asset_category_id: {
                type: new DataTypes.INTEGER().UNSIGNED,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            amount: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            invoice_picture: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            purchase_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            is_available: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            purchase_price: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: true,
            },
            depreciation_period: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            depreciation_count: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: true,
            },
            owner_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
          
            purchased_by: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
          
            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
            },
            creator: {
                type: new DataTypes.TINYINT(),
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
