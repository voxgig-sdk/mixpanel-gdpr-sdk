// Typed models for the MixpanelGdpr SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} CancelADeletion
 */

/**
 * @typedef {Object} CancelADeletionRemoveMatch
 * @property {string} tracking_id
 * @property {string} token
 */

/**
 * @typedef {Object} CheckDeletion
 * @property {string} compliance_type
 * @property {string} date_requested
 * @property {Array} distinct_ids
 * @property {number} project_id
 * @property {string} requesting_user
 * @property {string} status
 * @property {string} tracking_id
 */

/**
 * @typedef {Object} CheckDeletionLoadMatch
 * @property {string} tracking_id
 * @property {string} token
 */

/**
 * @typedef {Object} CheckRetrieval
 * @property {Array} [distinct_ids]
 * @property {string} [results]
 * @property {string} [status]
 */

/**
 * @typedef {Object} CheckRetrievalLoadMatch
 * @property {string} tracking_id
 * @property {string} token
 */

/**
 * @typedef {Object} V30
 * @property {string} [compliance_type]
 * @property {string} [disclosure_type]
 * @property {Array} [distinct_ids]
 */

/**
 * @typedef {Object} V30CreateData
 * @property {string} token
 * @property {string} [compliance_type]
 * @property {string} [disclosure_type]
 * @property {Array} [distinct_ids]
 */

