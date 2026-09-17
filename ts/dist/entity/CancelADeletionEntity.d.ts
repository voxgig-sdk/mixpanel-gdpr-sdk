import { MixpanelGdprEntityBase } from '../MixpanelGdprEntityBase';
import type { MixpanelGdprSDK } from '../MixpanelGdprSDK';
import type { Control } from '../types';
import type { CancelADeletion, CancelADeletionRemoveMatch } from '../MixpanelGdprTypes';
declare class CancelADeletionEntity extends MixpanelGdprEntityBase<CancelADeletion> {
    constructor(client: MixpanelGdprSDK, entopts: any);
    make(this: CancelADeletionEntity): CancelADeletionEntity;
    remove(this: any, reqmatch?: CancelADeletionRemoveMatch, ctrl?: Control): Promise<CancelADeletionEntity>;
}
export { CancelADeletionEntity };
