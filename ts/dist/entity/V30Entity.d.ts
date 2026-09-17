import { MixpanelGdprEntityBase } from '../MixpanelGdprEntityBase';
import type { MixpanelGdprSDK } from '../MixpanelGdprSDK';
import type { Control } from '../types';
import type { V30, V30CreateData } from '../MixpanelGdprTypes';
declare class V30Entity extends MixpanelGdprEntityBase<V30> {
    constructor(client: MixpanelGdprSDK, entopts: any);
    make(this: V30Entity): V30Entity;
    create(this: any, reqdata?: V30CreateData, ctrl?: Control): Promise<V30Entity>;
}
export { V30Entity };
