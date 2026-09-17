import { CancelADeletionEntity } from './entity/CancelADeletionEntity';
import { CheckDeletionEntity } from './entity/CheckDeletionEntity';
import { CheckRetrievalEntity } from './entity/CheckRetrievalEntity';
import { V30Entity } from './entity/V30Entity';
export type * from './MixpanelGdprTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MixpanelGdprEntityBase } from './MixpanelGdprEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MixpanelGdprSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CancelADeletion(entopts?: Record<string, any>): CancelADeletionEntity;
    CheckDeletion(entopts?: Record<string, any>): CheckDeletionEntity;
    CheckRetrieval(entopts?: Record<string, any>): CheckRetrievalEntity;
    V30(entopts?: Record<string, any>): V30Entity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MixpanelGdprSDK;
    tester(testopts?: any, sdkopts?: any): MixpanelGdprSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MixpanelGdprSDK;
export { stdutil, config, BaseFeature, MixpanelGdprEntityBase, MixpanelGdprSDK, SDK, };
