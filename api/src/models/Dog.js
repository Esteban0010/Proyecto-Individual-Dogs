const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:false,
     
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    life_span:{
      type:DataTypes.STRING,
      get() {
        return this.getDataValue('life_span') + ' Years';
      }
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
