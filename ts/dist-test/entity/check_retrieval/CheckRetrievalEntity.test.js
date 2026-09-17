"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CheckRetrievalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_GDPR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_GDPR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelGdprSDK.test();
        const ent = testsdk.CheckRetrieval();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_GDPR_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'check_retrieval.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "distinct_ids", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "results", "req": false, "short": "Link to the export if retrieval job is completed.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "status", "req": false, "short": "The status of the job.", "type": "`$STRING`", "index$": 2 }], "name": "check_retrieval", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "tracking_id", "orig": "tracking_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "token", "orig": "token", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /data-retrievals/v3.0/{tracking_id}", "json": "{\"operationId\":\"get-retrieval\",\"parameters\":[{\"description\":\"The task ID shown in the response\",\"in\":\"path\",\"name\":\"tracking_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Your project token\",\"in\":\"query\",\"name\":\"token\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing data about a retrieval job\",\"properties\":{\"results\":{\"properties\":{\"distinct_ids\":{\"example\":[\"distinct_id_1\",\"distinct_id_2\",\"distinct_id_3\"],\"items\":{\"description\":\"Distinct IDs involved in the request\",\"type\":\"string\"},\"type\":\"array\"},\"results\":{\"description\":\"Link to the export if retrieval job is completed. Will be an empty string if job is incomplete\",\"example\":\"linktoexportfile.com/9871287366712\",\"type\":\"string\"},\"status\":{\"description\":\"The status of the job.\",\"enum\":[\"PENDING\",\"STAGING\",\"STARTED\",\"SUCCESS\",\"FAILURE\",\"REVOKED\",\"NOT_FOUND\",\"UNKNOWN\"],\"example\":\"SUCCESS\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"CheckRetrievalResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"OAuthToken\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/data-retrievals/v3.0/{tracking_id}", "segments": [{ "lit": "data-retrievals" }, { "lit": "v3.0" }, { "var": "tracking_id" }], "select": { "exist": ["token", "tracking_id"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["v3.0"]] }, "key$": "check_retrieval", "name__orig": "check_retrieval", "Name": "CheckRetrieval", "name_": "check_retrieval", "name-": "check-retrieval", "NAME": "CHECK_RETRIEVAL", "index$": 2 }, { "active": true, "entity": "check_retrieval", "key$": "BasicCheckRetrievalFlow", "kind": "basic", "name": "BasicCheckRetrievalFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "check_retrieval_ref01", "srcdatavar": "check_retrieval_ref01_data", "suffix": "_dt0" }, "match": { "id": "check_retrieval01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-check_retrieval_ref01" } }], "index$": 0 }] }, 'CheckRetrieval');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let check_retrieval_ref01_data = Object.values(setup.data.existing.check_retrieval)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const check_retrieval_ref01_ent = client.CheckRetrieval();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/check_retrieval/CheckRetrievalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelGdprSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['check_retrieval01', 'check_retrieval02', 'check_retrieval03', 'v3.001', 'v3.002', 'v3.003'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID': idmap,
        'MIXPANEL_GDPR_TEST_LIVE': 'FALSE',
        'MIXPANEL_GDPR_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_GDPR_APIKEY': '',
        'MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN': "mixpanel",
    });
    idmap = env['MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_GDPR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelGdprSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.MIXPANEL_GDPR_APIKEY,
                server: {
                    regionAndDomain: env.MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MIXPANEL_GDPR_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CheckRetrievalEntity.test.js.map