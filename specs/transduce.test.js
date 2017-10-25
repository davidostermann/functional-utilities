const {compose, mapReducer, filterReducer, transduce, listCombination} = require('../utils')
const {numbers, inc, isOdd, add} = require('../mocks')

test('transduce return the same ARRAY as a map+filter operation', () => {

  const expected = numbers.map(inc).filter(isOdd);
  const transduced = transduce(compose(mapReducer(inc), filterReducer(isOdd)), listCombination, [], numbers)
  expect(transduced).toEqual(expected)

})

test('transduce return the same SUM as a map+filter+reduce operation', () => {

  const expected = numbers.map(inc).filter(isOdd).reduce(add);
  const transduced = transduce(compose( mapReducer(inc), filterReducer(isOdd) ), add, 0, numbers)
  expect(transduced).toBe(expected)

})



