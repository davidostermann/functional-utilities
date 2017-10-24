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
exports.curry = (fn) => {
  return function curried(...args) {
    return args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) => {
        return curried.call(this, ...args, ...rest);
      };
  };
}
