module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    });
    return Genre;
  };
  