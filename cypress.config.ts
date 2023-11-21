import { defineConfig } from 'cypress'

const HOST_FQDN: string = process.env.HOST_FQDN || 'localhost'

// Configuration documentation: https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  e2e: {
    baseUrl: `http://${HOST_FQDN}:3000`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Capturing video of the tests run with `cypress run`
  video: true,
})
