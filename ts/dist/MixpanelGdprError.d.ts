import { Context } from './Context';
declare class MixpanelGdprError extends Error {
    isMixpanelGdprError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MixpanelGdprError };
