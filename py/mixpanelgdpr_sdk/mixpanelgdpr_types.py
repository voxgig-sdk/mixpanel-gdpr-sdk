# Typed models for the MixpanelGdpr SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CancelADeletion(TypedDict):
    pass


class CancelADeletionRemoveMatch(TypedDict):
    tracking_id: str
    token: str


class CheckDeletion(TypedDict):
    compliance_type: str
    date_requested: str
    distinct_ids: list
    project_id: float
    requesting_user: str
    status: str
    tracking_id: str


class CheckDeletionLoadMatch(TypedDict):
    tracking_id: str
    token: str


class CheckRetrieval(TypedDict, total=False):
    distinct_ids: list
    results: str
    status: str


class CheckRetrievalLoadMatch(TypedDict):
    tracking_id: str
    token: str


class V30(TypedDict, total=False):
    compliance_type: str
    disclosure_type: str
    distinct_ids: list


class V30CreateDataRequired(TypedDict):
    token: str


class V30CreateData(V30CreateDataRequired, total=False):
    compliance_type: str
    disclosure_type: str
    distinct_ids: list
