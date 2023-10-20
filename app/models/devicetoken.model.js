module.exports = (sequelize, Sequelize) => {
    const DeviceTokens = sequelize.define('device_tokens', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        device_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        device_type: {
            type: Sequelize.ENUM('0', '1'),
            defaultValue: '0',
            comment: '0-iOS,1-Android',
        },
        unique_key: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        is_delete: {
            type: Sequelize.ENUM('0', '1'),
            defaultValue: '0',
        },
        is_testdata: {
            type: Sequelize.ENUM('0', '1'),
            defaultValue: '0',
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: "updated_at"
    })
    return DeviceTokens;
}
