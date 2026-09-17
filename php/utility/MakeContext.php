<?php
declare(strict_types=1);

// MixpanelGdpr SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelGdprMakeContext
{
    public static function call(array $ctxmap, ?MixpanelGdprContext $basectx): MixpanelGdprContext
    {
        return new MixpanelGdprContext($ctxmap, $basectx);
    }
}
