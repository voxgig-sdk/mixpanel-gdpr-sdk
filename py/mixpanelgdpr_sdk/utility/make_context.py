# MixpanelGdpr SDK utility: make_context

from mixpanelgdpr_sdk.core.context import MixpanelGdprContext


def make_context_util(ctxmap, basectx):
    return MixpanelGdprContext(ctxmap, basectx)
