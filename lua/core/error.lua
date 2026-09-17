-- MixpanelGdpr SDK error

local MixpanelGdprError = {}
MixpanelGdprError.__index = MixpanelGdprError


function MixpanelGdprError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelGdprError)
  self.is_sdk_error = true
  self.sdk = "MixpanelGdpr"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelGdprError:error()
  return self.msg
end


function MixpanelGdprError:__tostring()
  return self.msg
end


return MixpanelGdprError
