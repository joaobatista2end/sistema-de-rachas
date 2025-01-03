import { Match } from './match';
import { User } from './user';

export type PaymentParams = {
    id: string;
    paymentDate: Date;
    paymentMethod: string;
    match: Match;
    user: User;
};

export class Payment {
    id: string;
    paymentDate: Date;
    paymentMethod: string;
    match: Match;
    user: User;

    constructor(params: PaymentParams) {
        this.id = params.id;
        this.paymentDate = params.paymentDate;
        this.paymentMethod = params.paymentMethod;
        this.match = params.match;
        this.user = params.user;
    }

    get amount(): number {
        return this.match.amount;
    }
}