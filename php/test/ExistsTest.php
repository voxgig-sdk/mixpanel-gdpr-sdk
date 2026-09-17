<?php
declare(strict_types=1);

// MixpanelGdpr SDK exists test

require_once __DIR__ . '/../mixpanelgdpr_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelGdprSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
