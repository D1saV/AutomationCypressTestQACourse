import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "https://example.com",
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      
    },
    env: {
      TEST_EMAIL: 'deonisiyqa2406@gmail.com',
      TEST_EMAIL_PREFIX: 'DenisQA'
    },
  },
});
