import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "baseUrl": "https://example.com",
    "defaultCommandTimeout": 5000,
    "fixturesFolder": "cypress/fixtures",
    "specPattern": "**/*.cy.{js,jsx,ts,tsx}",
    "viewportWidth": 1280,
    "viewportHeight": 720,
    "screenshotsFolder": "cypress/screenshots",
    "videosFolder": "cypress/videos",
    "modifyObstructiveCode": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    env: {
      TEST_EMAIL: 'deonisiyqa2406@gmail.com',
      TEST_EMAIL_PREFIX: 'DenisQA'
    },
  },
});
