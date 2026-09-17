<?php
declare(strict_types=1);

// MixpanelGdpr SDK base feature

class MixpanelGdprBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelGdprContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelGdprContext $ctx): void {}
    public function PostConstructEntity(MixpanelGdprContext $ctx): void {}
    public function SetData(MixpanelGdprContext $ctx): void {}
    public function GetData(MixpanelGdprContext $ctx): void {}
    public function GetMatch(MixpanelGdprContext $ctx): void {}
    public function SetMatch(MixpanelGdprContext $ctx): void {}
    public function PrePoint(MixpanelGdprContext $ctx): void {}
    public function PreSpec(MixpanelGdprContext $ctx): void {}
    public function PreRequest(MixpanelGdprContext $ctx): void {}
    public function PreResponse(MixpanelGdprContext $ctx): void {}
    public function PreResult(MixpanelGdprContext $ctx): void {}
    public function PreDone(MixpanelGdprContext $ctx): void {}
    public function PreUnexpected(MixpanelGdprContext $ctx): void {}
}
