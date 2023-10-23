import { defineConfig } from 'cypress'

// Configuration documentation: https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Capturing video of the tests run with `cypress run`
  video: true,
})
