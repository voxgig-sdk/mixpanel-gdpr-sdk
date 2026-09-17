# MixpanelGdpr SDK feature factory

from mixpanelgdpr_sdk.feature.base_feature import MixpanelGdprBaseFeature
from mixpanelgdpr_sdk.feature.debug_feature import MixpanelGdprDebugFeature
from mixpanelgdpr_sdk.feature.idempotency_feature import MixpanelGdprIdempotencyFeature
from mixpanelgdpr_sdk.feature.metrics_feature import MixpanelGdprMetricsFeature
from mixpanelgdpr_sdk.feature.paging_feature import MixpanelGdprPagingFeature
from mixpanelgdpr_sdk.feature.ratelimit_feature import MixpanelGdprRatelimitFeature
from mixpanelgdpr_sdk.feature.retry_feature import MixpanelGdprRetryFeature
from mixpanelgdpr_sdk.feature.test_feature import MixpanelGdprTestFeature
from mixpanelgdpr_sdk.feature.timeout_feature import MixpanelGdprTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelGdprBaseFeature(),
    "debug": lambda: MixpanelGdprDebugFeature(),
    "idempotency": lambda: MixpanelGdprIdempotencyFeature(),
    "metrics": lambda: MixpanelGdprMetricsFeature(),
    "paging": lambda: MixpanelGdprPagingFeature(),
    "ratelimit": lambda: MixpanelGdprRatelimitFeature(),
    "retry": lambda: MixpanelGdprRetryFeature(),
    "test": lambda: MixpanelGdprTestFeature(),
    "timeout": lambda: MixpanelGdprTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
