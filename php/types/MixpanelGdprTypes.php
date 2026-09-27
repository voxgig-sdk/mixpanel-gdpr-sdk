<?php
declare(strict_types=1);

// Typed models for the MixpanelGdpr SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CancelADeletion entity data model. */
class CancelADeletion
{
}

/** Request payload for CancelADeletion#remove. */
class CancelADeletionRemoveMatch
{
    public string $tracking_id;
    public string $token;
}

/** CheckDeletion entity data model. */
class CheckDeletion
{
    public string $compliance_type;
    public string $date_requested;
    public array $distinct_ids;
    public float $project_id;
    public string $requesting_user;
    public string $status;
    public string $tracking_id;
}

/** Request payload for CheckDeletion#load. */
class CheckDeletionLoadMatch
{
    public string $tracking_id;
    public string $token;
}

/** CheckRetrieval entity data model. */
class CheckRetrieval
{
    public ?array $distinct_ids = null;
    public ?string $results = null;
    public ?string $status = null;
}

/** Request payload for CheckRetrieval#load. */
class CheckRetrievalLoadMatch
{
    public string $tracking_id;
    public string $token;
}

/** V30 entity data model. */
class V30
{
    public ?string $compliance_type = null;
    public ?string $disclosure_type = null;
    public ?array $distinct_ids = null;
}

/** Request payload for V30#create. */
class V30CreateData
{
    public string $token;
    public ?string $compliance_type = null;
    public ?string $disclosure_type = null;
    public ?array $distinct_ids = null;
}

