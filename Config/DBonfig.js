const Sequelize = require('sequelize')

const DBConnection = new Sequelize("sgic_base","web","johnstewart",{
    host:'192.168.19.240',
    dialect: 'mysql'
});

DBConnection.authenticate()
.then(function(){
   // console.log("FOI A CONEXAO");
}).catch(function (){
   // console.log("erro de conexao");
});

module.exports = DBConnection;