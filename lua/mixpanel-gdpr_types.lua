-- Typed models for the MixpanelGdpr SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CancelADeletion

---@class CancelADeletionRemoveMatch
---@field tracking_id string
---@field token string

---@class CheckDeletion
---@field compliance_type string
---@field date_requested string
---@field distinct_ids table
---@field project_id number
---@field requesting_user string
---@field status string
---@field tracking_id string

---@class CheckDeletionLoadMatch
---@field tracking_id string
---@field token string

---@class CheckRetrieval
---@field distinct_ids? table
---@field results? string
---@field status? string

---@class CheckRetrievalLoadMatch
---@field tracking_id string
---@field token string

---@class V30
---@field compliance_type? string
---@field disclosure_type? string
---@field distinct_ids? table

---@class V30CreateData
---@field token string
---@field compliance_type? string
---@field disclosure_type? string
---@field distinct_ids? table

local M = {}

return M
