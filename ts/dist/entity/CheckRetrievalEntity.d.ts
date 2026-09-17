import { MixpanelGdprEntityBase } from '../MixpanelGdprEntityBase';
import type { MixpanelGdprSDK } from '../MixpanelGdprSDK';
import type { Control } from '../types';
import type { CheckRetrieval, CheckRetrievalLoadMatch } from '../MixpanelGdprTypes';
declare class CheckRetrievalEntity extends MixpanelGdprEntityBase<CheckRetrieval> {
    constructor(client: MixpanelGdprSDK, entopts: any);
    make(this: CheckRetrievalEntity): CheckRetrievalEntity;
    load(this: any, reqmatch?: CheckRetrievalLoadMatch, ctrl?: Control): Promise<CheckRetrievalEntity>;
}
export { CheckRetrievalEntity };
