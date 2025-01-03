import { MatchDto } from './match.dto';
import { UserDto } from './user.dto';

export type PaymentDto = {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  match: Partial<MatchDto>;
  user: Partial<UserDto>;
};

export type CreatePaymentDto = {
  paymentDate: Date;
  paymentMethod: string;
  match: string;
  user: string;
};