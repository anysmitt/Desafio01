const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://lojaebac.ebaconline.art.br/',
   // defaultCommandTimeout: 10000
  },
});
