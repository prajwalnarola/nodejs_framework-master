module.exports = (sequelize, Sequelize) => {
    const ResetPasswordToken = sequelize.define('reset_password_token', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        token_value: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expired_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        used: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    }, { freezeTableName: true, timestamps: true, createdAt: "created_date", updatedAt: "updated_at" });
    return ResetPasswordToken
}
