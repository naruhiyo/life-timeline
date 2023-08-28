import { SampleLogic } from '@/api/SampleLogic'

describe('SampleLogic Test', () => {
  describe('say hello', () => {
    test('get `Hello World!`', () => {
      const actual: SampleLogic = new SampleLogic()
      expect(actual.hello()).toBe('Hello World!')
    })
  })

  describe('add number', () => {
    test('add positive number', () => {
      const actual: SampleLogic = new SampleLogic()
      actual.add(3)

      expect(actual.getNum).toBe(3)
    })
  })

  describe('get stored number', () => {
    test('get initialized number', () => {
      const actual: SampleLogic = new SampleLogic()

      expect(actual.getNum).toBe(0)
    })

    test('get after adding number', () => {
      const actual: SampleLogic = new SampleLogic()
      actual.add(3)

      expect(actual.getNum).toBe(3)
    })
  })
})
