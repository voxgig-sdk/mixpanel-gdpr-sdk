package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCancelADeletionEntityFunc func(client *MixpanelGdprSDK, entopts map[string]any) MixpanelGdprEntity

var NewCheckDeletionEntityFunc func(client *MixpanelGdprSDK, entopts map[string]any) MixpanelGdprEntity

var NewCheckRetrievalEntityFunc func(client *MixpanelGdprSDK, entopts map[string]any) MixpanelGdprEntity

var NewV30EntityFunc func(client *MixpanelGdprSDK, entopts map[string]any) MixpanelGdprEntity

