/**
 * Global mock methods.
 */

const intersectionObserverMock = () => ({
  observe: () => jest.fn(),
  unobserve: () => jest.fn(),
  disconnect: () => jest.fn(),
})

const getComputedStyleMock = (elt: Element) => CSSStyleDeclaration

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock)

Object.defineProperty(window, 'crypto', {
  value: { randomUUID: jest.fn().mockReturnValue('test-crypt') },
})
