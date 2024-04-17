/**
 * Global mock methods.
 */

const intersectionObserverMock = () => ({
  observe: () => jest.fn(),
  unobserve: () => jest.fn(),
  disconnect: () => jest.fn(),
})

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock)

Object.defineProperty(window, 'crypto', {
  value: { randomUUID: jest.fn().mockReturnValue('test-crypt') },
})
