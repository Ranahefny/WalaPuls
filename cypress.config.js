const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    // that is the path where the reports will be configured
    configFile: 'reporter-config.json',
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  env: {
    BaseURLTest: 'https://users-dt.walaplus.com'
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // const email=process.env.email;
      // const password=process.env.password;
      // if(!password ||!email){
      //   throw new Error('Please provide email and password')
      // }
      // config.env={email,password}
      //   return config
    },
    baseUrl: 'https://users-dt.walaplus.com',
  },
});
