
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelGdprSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelGdprSDK.test()
    equal(null !== testsdk, true)
  })

})
