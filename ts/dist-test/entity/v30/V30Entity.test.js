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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('V30Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_GDPR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_GDPR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelGdprSDK.test();
        const ent = testsdk.V30();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_GDPR_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v30.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "compliance_type": { "a": true, "h": "Compliance Type", "n": "compliance_type", "r": false, "sh": "Select CCPA or GDPR.", "t": "`$STRING`", "key$": "compliance_type", "index$": 0 }, "disclosure_type": { "a": true, "h": "Disclosure Type", "n": "disclosure_type", "r": false, "sh": "Only required if compliance_type = CCPA.", "t": "`$STRING`", "key$": "disclosure_type", "index$": 1 }, "distinct_ids": { "a": true, "h": "Distinct Ids", "n": "distinct_ids", "r": false, "t": "`$ARRAY`", "key$": "distinct_ids", "index$": 2 } }, "name": "v30", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /data-deletions/v3.0", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/data-deletions/v3.0", "q": { "exist": ["token"] }, "r": {}, "s": [{ "lit": "data-deletions" }, { "lit": "v3.0" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /data-retrievals/v3.0", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/data-retrievals/v3.0", "q": { "exist": ["token"] }, "r": {}, "s": [{ "lit": "data-retrievals" }, { "lit": "v3.0" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "v30", "name__orig": "v30", "Name": "V30", "name_": "v30", "name-": "v30", "NAME": "V30", "index$": 3 }, { "active": true, "entity": "v30", "key$": "BasicV30Flow", "kind": "basic", "name": "BasicV30Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "v30_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'V30', { "POST /data-deletions/v3.0": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "distinct_ids": { "type": "array", "items": { "type": "string", "description": "Distinct IDs involved in the request" }, "example": ["distinct_id_1", "distinct_id_2", "distinct_id_3"], "x-ref": "#/components/schemas/DistinctIds", "key$": "distinct_ids" }, "compliance_type": { "type": "string", "description": "Select CCPA or GDPR. Default is GDPR.", "x-ref": "#/components/schemas/ComplianceType", "key$": "compliance_type" } }, "index$": 1 } } } }, "parameters": [{ "name": "token", "in": "query", "schema": { "type": "string" }, "description": "Your project token", "required": true, "x-ref": "#/components/parameters/ProjectToken", "index$": 0 }] }, "POST /data-retrievals/v3.0": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "distinct_ids": { "type": "array", "items": { "type": "string", "description": "Distinct IDs involved in the request" }, "example": ["distinct_id_1", "distinct_id_2", "distinct_id_3"], "x-ref": "#/components/schemas/DistinctIds", "key$": "distinct_ids" }, "compliance_type": { "type": "string", "description": "Select CCPA or GDPR. Default is GDPR.", "x-ref": "#/components/schemas/ComplianceType", "key$": "compliance_type" }, "disclosure_type": { "type": "string", "description": "Only required if compliance_type = CCPA. Can be Data, Categories, or Sources. Default is Data.", "x-ref": "#/components/schemas/DisclosureType", "key$": "disclosure_type" } }, "index$": 1 } } } }, "parameters": [{ "name": "token", "in": "query", "schema": { "type": "string" }, "description": "Your project token", "required": true, "x-ref": "#/components/parameters/ProjectToken", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const v30_ref01_ent = client.V30();
        let v30_ref01_data = setup.data.new.v30['v30_ref01'];
        v30_ref01_data = (await v30_ref01_ent.create(v30_ref01_data)).data();
        (0, node_assert_1.default)(null != v30_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v30/V30TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelGdprSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v3001', 'v3002', 'v3003'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_GDPR_TEST_V30_ENTID': idmap,
        'MIXPANEL_GDPR_TEST_LIVE': 'FALSE',
        'MIXPANEL_GDPR_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_GDPR_APIKEY': '',
        'MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN': "mixpanel",
    });
    idmap = env['MIXPANEL_GDPR_TEST_V30_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_GDPR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_GDPR_TEST_V30_ENTID'];
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
//# sourceMappingURL=V30Entity.test.js.map