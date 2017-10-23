exports.partial = (fct, ...args) => fct.bind(null, ...args)
exports.partialRight = (fct, ...pargs) => (...args) => fct.apply(null, [...args, ...pargs])