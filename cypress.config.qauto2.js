import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    defaultCommandTimeout: 5000,
    fixturesFolder: "cypress/fixtures",
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotsFolder: "cypress/screenshots/site1",
    videosFolder: "cypress/videos/site1",
    modifyObstructiveCode: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      EMAIL: 'd.vasilevskiy2015@gmail.com',
      PASSWORD: 'QaZ123321',
    },
  },
});