exports.partial = (fct, ...args) => fct.bind(null, ...args)
exports.partialRight = (fct, ...pargs) => (...args) => fct.apply(null, [...args, ...pargs])

// pipe with multiple arguments at start
// Downside : it has to have unary function for the following functions
// So I decide to choose Eric Elliot solution that take unary functions for all
//const _pipe = (f, g) => (...args) => g(f(...args))
//exports.pipe = (...fcts) => fcts.reduce(_pipe)

//Only works with unary function (functions with only one arguments)
// from Eric Elliot : 
exports.compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
exports.pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a
exports.asyncPipe = (...fns) => x => (
  fns.reduce(async (y, f) => f(await y), x)
);

// currying function from http://www.datchley.name/currying-vs-partial-application/
// Dave Atchley explains that currying is not often useful because functions are variadic by default in javascript. So we can use partial (that he calls "apply")
// Big use case from Kyle Simpson : Transducer (Front End Master video / Functional Programming V2 by Lyle Simpson - video 36)
const curry = exports.curry = (fn) => {
  return function curried(...args) {
    return args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) => {
        return curried.call(this, ...args, ...rest);
      };
  };
}

// this function mutate the array. It should just be used in reducer function that return an array. If we return a new array, it breaks performance.
// So in reduce function that ruturn an array, you have to use the same array in iteration (so mutating it). 
// it is unnecessary to use immutable paradigm in this case and it is performance pitfall
exports.listCombination = (list, v) => {
  list.push(v)
  return list
}

// like a map, but with a reduce
// the function is curried to be use first in a function composition et secondly as combine function (ex. sum, push in list, ...)
exports.mapReducer = curry( (mappingFn, combineFn) => (
  (list, v) => combineFn( list, mappingFn(v) )
))

// like a filter, but with a reduce
// the function is curried to be use first in a function composition et secondly as combine function (ex. sum, push in list, ...)
exports.filterReducer = curry((predicateFn, combineFn) => (
  (list, v) => (predicateFn(v)) ? combineFn(list, v) : list
))

/**
 * Transduce enable to map, filter and reduce (and maybe others) in the same iteration
 * tranducer : function composition (cf.compose & pipe) - ex. compose( mapReducer(inc), filterReducer(isOdd))
 * combineFn : function used to combine results of the transducer
 * initialValue : initial value for combine function
 * list: the list as the transduce operation's input
 * return the transduce operation's result
 */
exports.transduce = (transducer, combineFn, initialValue, list) => (
  list.reduce( transducer(combineFn), initialValue)
)
