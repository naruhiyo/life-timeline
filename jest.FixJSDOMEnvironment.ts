import JSDOMEnvironment from 'jest-environment-jsdom'

/**
 * This file has been obtained from the following URL: https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943.
 * To conduct browser testing, we require the use of jsdom; however, there is a bug (https://github.com/facebook/jest/blob/v29.4.3/website/versioned_docs/version-29.4/Configuration.md#testenvironment-string).
 * This file addresses the mentioned bug.
 */
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args)

    this.global.structuredClone = structuredClone
  }
}
