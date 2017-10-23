const _pipe = (f, g) => (...args) => g(f(...args))
module.exports = (...fcts) => fcts.reduce(_pipe)