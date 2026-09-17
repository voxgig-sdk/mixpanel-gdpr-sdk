<?php
declare(strict_types=1);

// MixpanelGdpr SDK utility: result_headers

class MixpanelGdprResultHeaders
{
    public static function call(MixpanelGdprContext $ctx): ?MixpanelGdprResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
