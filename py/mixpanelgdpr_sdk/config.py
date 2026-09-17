# MixpanelGdpr SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MixpanelGdpr",
            "slug": "mixpanel-gdpr",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{regionAndDomain}.com/api/app",
            "server": {
                "regionAndDomain": "mixpanel",
            },
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "cancel_a_deletion": {},
                "check_deletion": {},
                "check_retrieval": {},
                "v30": {},
            },
        },
        "entity": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "token",
                      "orig": "token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/data-deletions/v3.0/{tracking_id}",
                "segments": [
                  {
                    "lit": "data-deletions",
                  },
                  {
                    "lit": "v3.0",
                  },
                  {
                    "var": "tracking_id",
                  },
                ],
                "select": {
                  "exist": [
                    "token",
                    "tracking_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-deletions",
                  "v3.0",
                  "{tracking_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v3.0",
            ],
          ],
        },
      },
      "check_deletion": {
        "fields": [
          {
            "name": "compliance_type",
            "req": True,
            "short": "GDPR or CCPA",
            "type": "`$STRING`",
          },
          {
            "name": "date_requested",
            "req": True,
            "short": "The timestamp when the deletion job was requested",
            "type": "`$STRING`",
          },
          {
            "name": "distinct_ids",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "project_id",
            "req": True,
            "short": "The id of the project this job is for",
            "type": "`$NUMBER`",
          },
          {
            "name": "requesting_user",
            "req": True,
            "short": "The user that created the deletion job request",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "The status of the job.",
            "type": "`$STRING`",
          },
          {
            "name": "tracking_id",
            "req": True,
            "short": "The tracking id of the deletion job",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "token",
                      "orig": "token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/data-deletions/v3.0/{tracking_id}",
                "segments": [
                  {
                    "lit": "data-deletions",
                  },
                  {
                    "lit": "v3.0",
                  },
                  {
                    "var": "tracking_id",
                  },
                ],
                "select": {
                  "exist": [
                    "token",
                    "tracking_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "data-deletions",
                  "v3.0",
                  "{tracking_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v3.0",
            ],
          ],
        },
      },
      "check_retrieval": {
        "fields": [
          {
            "name": "distinct_ids",
            "type": "`$ARRAY`",
          },
          {
            "name": "results",
            "short": "Link to the export if retrieval job is completed.",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "short": "The status of the job.",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "token",
                      "orig": "token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/data-retrievals/v3.0/{tracking_id}",
                "segments": [
                  {
                    "lit": "data-retrievals",
                  },
                  {
                    "lit": "v3.0",
                  },
                  {
                    "var": "tracking_id",
                  },
                ],
                "select": {
                  "exist": [
                    "token",
                    "tracking_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "data-retrievals",
                  "v3.0",
                  "{tracking_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v3.0",
            ],
          ],
        },
      },
      "v30": {
        "fields": [
          {
            "name": "compliance_type",
            "short": "Select CCPA or GDPR.",
            "type": "`$STRING`",
          },
          {
            "name": "disclosure_type",
            "short": "Only required if compliance_type = CCPA.",
            "type": "`$STRING`",
          },
          {
            "name": "distinct_ids",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/data-deletions/v3.0",
                "segments": [
                  {
                    "lit": "data-deletions",
                  },
                  {
                    "lit": "v3.0",
                  },
                ],
                "select": {
                  "exist": [
                    "token",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "data-deletions",
                  "v3.0",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "token",
                      "orig": "token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/data-retrievals/v3.0",
                "segments": [
                  {
                    "lit": "data-retrievals",
                  },
                  {
                    "lit": "v3.0",
                  },
                ],
                "select": {
                  "exist": [
                    "token",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "data-retrievals",
                  "v3.0",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
