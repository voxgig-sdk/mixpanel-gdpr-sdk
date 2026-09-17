export interface CancelADeletion {
}
export interface CancelADeletionRemoveMatch {
    tracking_id: string;
    token: string;
}
export interface CheckDeletion {
    compliance_type: string;
    date_requested: string;
    distinct_ids: any[];
    project_id: number;
    requesting_user: string;
    status: string;
    tracking_id: string;
}
export interface CheckDeletionLoadMatch {
    tracking_id: string;
    token: string;
}
export interface CheckRetrieval {
    distinct_ids?: any[];
    results?: string;
    status?: string;
}
export interface CheckRetrievalLoadMatch {
    tracking_id: string;
    token: string;
}
export interface V30 {
    compliance_type?: string;
    disclosure_type?: string;
    distinct_ids?: any[];
}
export interface V30CreateData {
    token: string;
    compliance_type?: string;
    disclosure_type?: string;
    distinct_ids?: any[];
}
