-- MixpanelGdpr SDK exists test

local sdk = require("mixpanel-gdpr_sdk")

describe("MixpanelGdprSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
