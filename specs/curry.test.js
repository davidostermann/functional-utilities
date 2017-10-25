const { curry, compose, pipe } = require('../utils')
const {add, dbl} = require('../mocks')

test( 'executing curried function results as the same as executing original function', () => {
  expect( curry(add)(2)(3) ).toBe( add(2, 3))
})

test( 'currying add to compose with double', () => {
  const curryAdd = curry(add)
  const inc = curryAdd(1)
  const incDbl = compose(inc, dbl)
  expect( incDbl(2)).toBe( inc(dbl(2)) ) // 5
})

test('currying add to pipe with double', () => {
  const curryAdd = curry(add)
  const inc = curryAdd(1)
  const incDbl = pipe(inc, dbl)
  expect(incDbl(2)).toBe( dbl(inc(2)) ) // 6
})
