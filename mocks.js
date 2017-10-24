exports.add = (a, b) => a + b
exports.divide = (a, b) => a / b
exports.inc = (n) => n + 1
exports.dbl = (n) => n * 2
exports.push = (arr, ...args) => [...arr, ...args]

const files = ['file1.jpg', 'file2.jpg', 'file3.jpg']
exports.files = files

exports.finalData = {
  user: { id: '12345' },
  folder: { path: '/path-to-upload-folder' },
  files: files
}

const accessError = {
  type: 'AccessError',
  message: 'User does not have access'
}
exports.accessError = accessError

exports.getUser = (data) => Promise.resolve(Object.assign({}, data, { user: exports.finalData.user}))
exports.getFolder = (data) => Promise.resolve(Object.assign({}, data, { folder: exports.finalData.folder}))
exports.haveAccess = (data) => Promise.resolve(data)
exports.upload = (data) => Promise.resolve(data) 

exports.haveNoAccess = () => Promise.reject(accessError)

