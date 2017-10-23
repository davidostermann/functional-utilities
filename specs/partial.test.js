const {partial, partialRight} = require('../utils')
const { add, divide, push } = require('../mocks')

test('partial de add de 3 avec 2', () => {
  expect(partial(add, 2)(3)).toBe(5)
})

test('partial de divide 6 par 2', () => {
  expect(partial(divide, 6)(2)).toBe(3)
})

test('partially push', () => {
  expect(partial(push, [], 1)(2, 3, 4)).toEqual([1, 2, 3, 4])
})

test('partial de divide 6 par 2 en commençant par le diviseur', () => {
  expect(partialRight(divide, 2)(6)).toBe(3)
})

// test débile... un pop ferait l'affaire...
test('partial push at start', () => {
  expect(partialRight(partial(push, []), 2, 3, 4)(1)).toEqual([1, 2, 3, 4])
})
