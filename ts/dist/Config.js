"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'MixpanelGdpr',
        slug: "mixpanel-gdpr",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://{regionAndDomain}.com/api/app",
        server: {
            "regionAndDomain": "mixpanel",
        },
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            cancel_a_deletion: {},
            check_deletion: {},
            check_retrieval: {},
            v30: {},
        }
    };
    entity = {
        "cancel_a_deletion": {
            "fields": [],
            "name": "cancel_a_deletion",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "token",
                                        "orig": "token",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/data-deletions/v3.0/{tracking_id}",
                            "segments": [
                                {
                                    "lit": "data-deletions"
                                },
                                {
                                    "lit": "v3.0"
                                },
                                {
                                    "var": "tracking_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "data-deletions",
                                "v3.0",
                                "{tracking_id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v3.0"
                    ]
                ]
            }
        },
        "check_deletion": {
            "fields": [
                {
                    "name": "compliance_type",
                    "req": true,
                    "short": "GDPR or CCPA",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_requested",
                    "req": true,
                    "short": "The timestamp when the deletion job was requested",
                    "type": "`$STRING`"
                },
                {
                    "name": "distinct_ids",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "project_id",
                    "req": true,
                    "short": "The id of the project this job is for",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "requesting_user",
                    "req": true,
                    "short": "The user that created the deletion job request",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "req": true,
                    "short": "The status of the job.",
                    "type": "`$STRING`"
                },
                {
                    "name": "tracking_id",
                    "req": true,
                    "short": "The tracking id of the deletion job",
                    "type": "`$STRING`"
                }
            ],
            "name": "check_deletion",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "token",
                                        "orig": "token",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/data-deletions/v3.0/{tracking_id}",
                            "segments": [
                                {
                                    "lit": "data-deletions"
                                },
                                {
                                    "lit": "v3.0"
                                },
                                {
                                    "var": "tracking_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "data-deletions",
                                "v3.0",
                                "{tracking_id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v3.0"
                    ]
                ]
            }
        },
        "check_retrieval": {
            "fields": [
                {
                    "name": "distinct_ids",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "results",
                    "short": "Link to the export if retrieval job is completed.",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "short": "The status of the job.",
                    "type": "`$STRING`"
                }
            ],
            "name": "check_retrieval",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "token",
                                        "orig": "token",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/data-retrievals/v3.0/{tracking_id}",
                            "segments": [
                                {
                                    "lit": "data-retrievals"
                                },
                                {
                                    "lit": "v3.0"
                                },
                                {
                                    "var": "tracking_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "data-retrievals",
                                "v3.0",
                                "{tracking_id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v3.0"
                    ]
                ]
            }
        },
        "v30": {
            "fields": [
                {
                    "name": "compliance_type",
                    "short": "Select CCPA or GDPR.",
                    "type": "`$STRING`"
                },
                {
                    "name": "disclosure_type",
                    "short": "Only required if compliance_type = CCPA.",
                    "type": "`$STRING`"
                },
                {
                    "name": "distinct_ids",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "v30",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "token",
                                        "orig": "token",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/data-deletions/v3.0",
                            "segments": [
                                {
                                    "lit": "data-deletions"
                                },
                                {
                                    "lit": "v3.0"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "token"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "data-deletions",
                                "v3.0"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "token",
                                        "orig": "token",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/data-retrievals/v3.0",
                            "segments": [
                                {
                                    "lit": "data-retrievals"
                                },
                                {
                                    "lit": "v3.0"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "token"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "data-retrievals",
                                "v3.0"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map