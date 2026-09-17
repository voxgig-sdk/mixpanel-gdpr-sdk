# MixpanelGdpr SDK exists test

import pytest
from mixpanelgdpr_sdk import MixpanelGdprSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelGdprSDK.test(None, None)
        assert testsdk is not None
