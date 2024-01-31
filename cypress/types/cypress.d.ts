export declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mock crypto module
       */
      spyCypress(): void
    }
  }
}
