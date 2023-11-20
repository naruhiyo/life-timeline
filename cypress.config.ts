import { defineConfig } from 'cypress'

let environment: string | undefined = process.env.RUN_FQDN

if (environment === undefined) {
  environment = 'localhost'
}

// Configuration documentation: https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  e2e: {
    // If you run on Docker, you need to use `web:3000` instead of `localhost:3000`.
    baseUrl: `http://${environment}:3000`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Capturing video of the tests run with `cypress run`
  video: true,
})
