import { MixpanelGdprEntityBase } from '../MixpanelGdprEntityBase';
import type { MixpanelGdprSDK } from '../MixpanelGdprSDK';
import type { Control } from '../types';
import type { CheckDeletion, CheckDeletionLoadMatch } from '../MixpanelGdprTypes';
declare class CheckDeletionEntity extends MixpanelGdprEntityBase<CheckDeletion> {
    constructor(client: MixpanelGdprSDK, entopts: any);
    make(this: CheckDeletionEntity): CheckDeletionEntity;
    load(this: any, reqmatch?: CheckDeletionLoadMatch, ctrl?: Control): Promise<CheckDeletionEntity>;
}
export { CheckDeletionEntity };
