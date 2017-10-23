exports.partial = (fct, ...args) => fct.bind(null, ...args)
exports.partialRight = (fct, ...pargs) => (...args) => fct.apply(null, [...args, ...pargs])

//const _pipe = (f, g) => (...args) => g(f(...args))
//exports.pipe = (...fcts) => fcts.reduce(_pipe)

//Only works with unaries (functions with only one arguments)
// from eric elliot
exports.compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
exports.pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);