const {asyncPipe} = require('../utils')
const { finalData, 
        files, 
        getUser, 
        getFolder, 
        haveAccess, 
        upload,
        haveNoAccess,
        accessError } = require('../mocks')

// REF : How to use async await with jest : http://www.albertgao.xyz/2017/06/19/test-your-model-via-jest-and-mongoose/#more

test('it go to final step with final data', async () => {
  const uploadFiles = asyncPipe(
    getUser,
    getFolder,
    haveAccess,
    upload
  )
  const result = await uploadFiles({ files })
  expect(result).toEqual(finalData)
})

test('it have no access', async () => {
  
  const uploadFiles = asyncPipe(
    getUser,
    getFolder,
    haveNoAccess,
    upload
  )
  try {
    await uploadFiles({ files })
  }
  catch (err) {
    expect(err).toEqual(accessError)
  }
})
