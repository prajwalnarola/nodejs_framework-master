const dbConfig = require("../config/db");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.password, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  // logging: false,
});

const db = {};

db.sequelize = sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.post = require("./posts.model")(sequelize, Sequelize);
db.DeviceTokens = require("./devicetoken.model")(sequelize, Sequelize);
db.ResetPasswordToken = require("./resetpasswordtoken.model")(sequelize, Sequelize);

// has RELATIONS (HasMany / HasOne)
db.user.hasMany(db.post, { as: "posts", foreignKey: "user_id", targetKey: "id", onDelete: "CASCADE", onUpdate: "NO ACTION" });

// belongsTO RELATION (BelongsTo / BelongsToMany)(foreign-key)
db.post.belongsTo(db.user, { as: "user", foreignKey: "user_id", targetKey: "id", onDelete: "CASCADE", onUpdate: "NO ACTION" });
db.DeviceTokens.belongsTo(db.user, { as: "user", foreignKey: "user_id", targetKey: "id", onDelete: "CASCADE", onUpdate: "NO ACTION" });
db.ResetPasswordToken.belongsTo(db.user, { as: "user", foreignKey: "user_id", targetKey: "id", onDelete: "CASCADE", onUpdate: "NO ACTION" });

module.exports = db;
