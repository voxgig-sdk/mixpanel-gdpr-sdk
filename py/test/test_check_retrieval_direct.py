# CheckRetrieval direct test

import json
import pytest

from mixpanelgdpr_sdk.utility.voxgig_struct import voxgig_struct as vs
from mixpanelgdpr_sdk import MixpanelGdprSDK
from mixpanelgdpr_sdk.core import helpers
from test import runner


class TestCheckRetrievalDirect:

    def test_should_direct_load_check_retrieval(self):
        setup = _check_retrieval_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-check_retrieval", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            # pytest already imported at module scope
            pytest.skip("live direct-load needs real ID — set *_ENTID env var with real IDs to run")
            return

        client = setup["client"]

        params = {}
        query = {}
        if not setup["live"]:
            params["tracking_id"] = "direct01"

        result = client.direct({
            "path": "data-retrievals/v3.0/{tracking_id}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx. Skip
            # rather than fail when the load endpoint isn't reachable
            # with the IDs we can construct from setup.idmap.
            if result.get("err") is not None:
                pytest.skip(f"load call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("load call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _check_retrieval_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID": {},
        "MIXPANEL_GDPR_TEST_LIVE": "FALSE",
        "MIXPANEL_GDPR_APIKEY": "",
        "MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN": "mixpanel",
    })

    live = env.get("MIXPANEL_GDPR_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("MIXPANEL_GDPR_APIKEY"),
            "server": {
                "regionAndDomain": env.get("MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN"),
            },
        })
        client = MixpanelGdprSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = MixpanelGdprSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
