
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelGdprSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MixpanelGdprSDK.test()
    equal(testsdk instanceof MixpanelGdprSDK, true,
      'MixpanelGdprSDK.test() must return a client synchronously')
  })

})
