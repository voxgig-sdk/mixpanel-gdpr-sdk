"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixpanelGdprError = void 0;
class MixpanelGdprError extends Error {
    isMixpanelGdprError = true;
    sdk = 'MixpanelGdpr';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MixpanelGdprError = MixpanelGdprError;
//# sourceMappingURL=MixpanelGdprError.js.map