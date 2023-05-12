const { defineConfig } = require("cypress");

module.exports = defineConfig({
    
  e2e: {
    baseUrl: "https://cine-books.com",
    viewportHeight: 1080,
    viewportWidth: 1920,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
