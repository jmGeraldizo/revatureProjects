export class User {
    username = '';
    password = '';
    role?: string;
    reimbursements?: Reimbursements[] = [];
}

export interface Reimbursements {
    pending: number;
    available: number;
    awarded: number;
}