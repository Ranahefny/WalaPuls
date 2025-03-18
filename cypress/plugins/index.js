const mysql = require("mysql");//sql require mysql package to connect to the database that constanse inherit all function under the sql package
function queryTestDB(query, config) {  
    //plugin has access to the config object, which contains all the configuration options from cypress using config variable
    const connection = mysql.createConnection(config.env.db);
    //start connection to the database
    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
        if (error) reject(error);
        else
        {
            connection.end();
            resolve(results);
        }
       
        });
    });

 }

module.exports = (on, config) => {
  on("task", {
    queryTestDB: (query )=> {
      return queryTestDB(query, config);
    }
  });
}