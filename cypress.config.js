const { defineConfig } = require("cypress");
const mysql = require("mysql2");
const tunnel = require("tunnel-ssh"); // Ensure it's installed
const fs = require("fs");
module.exports = {
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: "https://users-dt.walaplus.com",
    env: {},
    
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return new Promise((resolve, reject) => {
            const sshConfig = {
              host: "34.250.140.82", // SSH Server
              port: 22,
              username: "wp-test",
              privateKey: fs.readFileSync("C:/Users/rana/.ssh/id_rsa"), 
              dstHost: "walaplus-dev-test.cbpxotj1mzx2.eu-west-1.rds.amazonaws.com", // MySQL Host
              dstPort: 3306,
              localHost: "127.0.0.1",
              localPort: 3307,
            };

            tunnel(sshConfig, function (err, server) {
              if (err) {
                console.error("SSH Tunnel Error:", err);
                return reject(err);
              }

              const connection = mysql.createConnection({
                host: "127.0.0.1",
                port: 3307,
                user: "walaplus_test_user",
                password: "Yxsbnhl:cEqK(f8Nr{Q-@>AGM",
                database: "walaplus_test",
              });

              connection.query(query, (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
                connection.end();
                server.close();
              });
            });
          });
        },
      });

      return config;
    },
  },
};