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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
                            "parts": [
                                "data-deletions",
                                "v3.0",
                                "{tracking_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "token",
                                        "orig": "token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "check_deletion": {
            "fields": [
                {
                    "name": "compliance_type",
                    "title": "Compliance Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "GDPR or CCPA"
                },
                {
                    "name": "date_requested",
                    "title": "Date Requested",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The timestamp when the deletion job was requested"
                },
                {
                    "name": "distinct_ids",
                    "title": "Distinct Ids",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The id of the project this job is for"
                },
                {
                    "name": "requesting_user",
                    "title": "Requesting User",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user that created the deletion job request"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The status of the job."
                },
                {
                    "name": "tracking_id",
                    "title": "Tracking Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The tracking id of the deletion job"
                }
            ],
            "name": "check_deletion",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "data-deletions",
                                "v3.0",
                                "{tracking_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "token",
                                        "orig": "token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "check_retrieval": {
            "fields": [
                {
                    "name": "distinct_ids",
                    "title": "Distinct Ids",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$STRING`",
                    "short": "Link to the export if retrieval job is completed."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The status of the job."
                }
            ],
            "name": "check_retrieval",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "data-retrievals",
                                "v3.0",
                                "{tracking_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "tracking_id",
                                        "orig": "tracking_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "token",
                                        "orig": "token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "token",
                                    "tracking_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "v30": {
            "fields": [
                {
                    "name": "compliance_type",
                    "title": "Compliance Type",
                    "type": "`$STRING`",
                    "short": "Select CCPA or GDPR."
                },
                {
                    "name": "disclosure_type",
                    "title": "Disclosure Type",
                    "type": "`$STRING`",
                    "short": "Only required if compliance_type = CCPA."
                },
                {
                    "name": "distinct_ids",
                    "title": "Distinct Ids",
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
                            "parts": [
                                "data-deletions",
                                "v3.0"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "token",
                                        "orig": "token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "token"
                                ]
                            }
                        },
                        {
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
                            "parts": [
                                "data-retrievals",
                                "v3.0"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "token",
                                        "orig": "token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "token"
                                ]
                            }
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