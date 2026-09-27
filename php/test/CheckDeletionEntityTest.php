<?php
declare(strict_types=1);

// CheckDeletion entity test

require_once __DIR__ . '/../mixpanelgdpr_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CheckDeletionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MixpanelGdprSDK::test(null, null);
        $ent = $testsdk->CheckDeletion(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = check_deletion_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "check_deletion." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $check_deletion_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.check_deletion")));
        $check_deletion_ref01_data = null;
        if (count($check_deletion_ref01_data_raw) > 0) {
            $check_deletion_ref01_data = Helpers::to_map($check_deletion_ref01_data_raw[0][1]);
        }

        // LOAD
        $check_deletion_ref01_ent = $client->CheckDeletion(null);
        $check_deletion_ref01_match_dt0 = [];
        $check_deletion_ref01_data_dt0_loaded = $check_deletion_ref01_ent->load($check_deletion_ref01_match_dt0, null);
        $this->assertNotNull($check_deletion_ref01_data_dt0_loaded);

    }
}

function check_deletion_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/check_deletion/CheckDeletionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MixpanelGdprSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["check_deletion01", "check_deletion02", "check_deletion03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID" => $idmap,
        "MIXPANEL_GDPR_TEST_LIVE" => "FALSE",
        "MIXPANEL_GDPR_TEST_EXPLAIN" => "FALSE",
        "MIXPANEL_GDPR_APIKEY" => "",
        "MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN" => 'mixpanel',
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MIXPANEL_GDPR_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["MIXPANEL_GDPR_APIKEY"],
                "server" => [
                    "regionAndDomain" => $env["MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN"],
                ],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new MixpanelGdprSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["MIXPANEL_GDPR_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MIXPANEL_GDPR_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
