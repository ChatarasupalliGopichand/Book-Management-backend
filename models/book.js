module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
    return Book;
  };
  