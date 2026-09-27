package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MixpanelGdpr",
			"slug": "mixpanel-gdpr",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://{regionAndDomain}.com/api/app",
			"server": map[string]any{
				"regionAndDomain": "mixpanel",
			},
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cancel_a_deletion": map[string]any{},
				"check_deletion": map[string]any{},
				"check_retrieval": map[string]any{},
				"v30": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cancel_a_deletion": map[string]any{
				"fields": []any{},
				"name": "cancel_a_deletion",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/data-deletions/v3.0/{tracking_id}",
								"segments": []any{
									map[string]any{
										"lit": "data-deletions",
									},
									map[string]any{
										"lit": "v3.0",
									},
									map[string]any{
										"var": "tracking_id",
									},
								},
								"parts": []any{
									"data-deletions",
									"v3.0",
									"{tracking_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "tracking_id",
											"orig": "tracking_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
										"tracking_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"check_deletion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "compliance_type",
						"title": "Compliance Type",
						"type": "`$STRING`",
						"req": true,
						"short": "GDPR or CCPA",
					},
					map[string]any{
						"name": "date_requested",
						"title": "Date Requested",
						"type": "`$STRING`",
						"req": true,
						"short": "The timestamp when the deletion job was requested",
					},
					map[string]any{
						"name": "distinct_ids",
						"title": "Distinct Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The id of the project this job is for",
					},
					map[string]any{
						"name": "requesting_user",
						"title": "Requesting User",
						"type": "`$STRING`",
						"req": true,
						"short": "The user that created the deletion job request",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The status of the job.",
					},
					map[string]any{
						"name": "tracking_id",
						"title": "Tracking Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The tracking id of the deletion job",
					},
				},
				"name": "check_deletion",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data-deletions/v3.0/{tracking_id}",
								"segments": []any{
									map[string]any{
										"lit": "data-deletions",
									},
									map[string]any{
										"lit": "v3.0",
									},
									map[string]any{
										"var": "tracking_id",
									},
								},
								"parts": []any{
									"data-deletions",
									"v3.0",
									"{tracking_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "tracking_id",
											"orig": "tracking_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
										"tracking_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"check_retrieval": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "distinct_ids",
						"title": "Distinct Ids",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$STRING`",
						"short": "Link to the export if retrieval job is completed.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The status of the job.",
					},
				},
				"name": "check_retrieval",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data-retrievals/v3.0/{tracking_id}",
								"segments": []any{
									map[string]any{
										"lit": "data-retrievals",
									},
									map[string]any{
										"lit": "v3.0",
									},
									map[string]any{
										"var": "tracking_id",
									},
								},
								"parts": []any{
									"data-retrievals",
									"v3.0",
									"{tracking_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "tracking_id",
											"orig": "tracking_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
										"tracking_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v30": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "compliance_type",
						"title": "Compliance Type",
						"type": "`$STRING`",
						"short": "Select CCPA or GDPR.",
					},
					map[string]any{
						"name": "disclosure_type",
						"title": "Disclosure Type",
						"type": "`$STRING`",
						"short": "Only required if compliance_type = CCPA.",
					},
					map[string]any{
						"name": "distinct_ids",
						"title": "Distinct Ids",
						"type": "`$ARRAY`",
					},
				},
				"name": "v30",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/data-deletions/v3.0",
								"segments": []any{
									map[string]any{
										"lit": "data-deletions",
									},
									map[string]any{
										"lit": "v3.0",
									},
								},
								"parts": []any{
									"data-deletions",
									"v3.0",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/data-retrievals/v3.0",
								"segments": []any{
									map[string]any{
										"lit": "data-retrievals",
									},
									map[string]any{
										"lit": "v3.0",
									},
								},
								"parts": []any{
									"data-retrievals",
									"v3.0",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
