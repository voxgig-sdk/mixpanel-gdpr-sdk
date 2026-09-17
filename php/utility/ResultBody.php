<?php
declare(strict_types=1);

// MixpanelGdpr SDK utility: result_body

class MixpanelGdprResultBody
{
    public static function call(MixpanelGdprContext $ctx): ?MixpanelGdprResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
