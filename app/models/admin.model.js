module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    "admin",
    {
      config_key: {
        type: Sequelize.STRING,
      },
      config_value: {
        type: Sequelize.STRING,
      },
      value_unit: {
        type: Sequelize.STRING,
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: "0",
        comment: "0 = false, 1 = true",
      },
      is_testdata: {
        type: Sequelize.BOOLEAN,
        defaultValue: "1",
        comment: "0 = false, 1 = true",
      },
    },
    { freezeTableName: true, timestamps: false },
  );
  return Admin;
};
