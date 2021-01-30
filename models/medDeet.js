module.exports = function (sequelize, DataTypes) {
    const  MedDeet = sequelize.define("MedDeet", {
        timeTaken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountTaken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
    });

    MedDeet.associate = (db) => {
        db.MedDeet.belongsTo(db.Medicine)
    }

    return MedDeet;
};

