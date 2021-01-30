module.exports = function (sequelize, DataTypes) {
    const  Medicine = sequelize.define("Medicine", {
        medicineName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        waitingPeriod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Medicine.associate = (db) => {
        db.Medicine.belongsTo(db.User)
        db.Medicine.hasMany(db.MedDeet)
    }

    return Medicine;
}