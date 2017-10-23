const { pipe, compose, partial, partialRight } = require('../utils')
const { add, inc, dbl, divide} = require('../mocks')

test('dbl + inc de 3', () => {
  expect( pipe(dbl, inc)(3) ).toBe(7)
})

test('dbl + add4 + inc de 3', () => {
  //(3*2)+4+1
  expect(pipe(dbl, partial(add, 4), inc)(3)).toBe(11)
})

test('add + inc sur 2 et 3', () => {
  //expect(pipe(add, inc)(2, 3)).toBe(6)
  expect(pipe( partial(add, 2) , inc)(3)).toBe(6)
})

test('add + inc + dbl sur 2 et 3', () => {
  //expect( pipe( add, inc, dbl )(3, 2) ).toBe(10)
  expect( pipe( partial(add, 2), inc, dbl )(2) ).toBe(10)
})

test('add + inc + (divide avec 12 comme dividende) sur 2 et 3', () => {
  // 12 / ((2 + 3) + 1)
  //expect( pipe( add, inc, partial(divide, 12))(2, 3) ).toBe(2)
  expect( pipe(partial(add, 2), inc, partial(divide, 12) )(3)).toBe(2)
})

test('add + inc + (divide avec 2 comme diviseur) sur 2 et 3', () => {
  // ((2 + 3) + 1) / 2
  
  //expect(pipe( add, inc, partialRight(divide, 2))(2, 3)).toBe(3)
  expect(pipe( partial(add, 2), inc, partialRight(divide, 2))(3)).toBe(3)
})

test('add + inc + (divide avec 12 comme dividende) sur 2 et 3', () => {
  // ((2 + 3) + 1) / 12
  //expect(compose(partialRight(divide, 2), inc, add )(2, 3)).toBe(3)
  expect( compose( partialRight(divide, 2), inc, partial(add, 2) )(3)).toBe(3)
})

