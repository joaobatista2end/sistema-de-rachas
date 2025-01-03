import { Payment } from '../../domain/entities/payment';
import { PaymentDto } from '../../domain/dto/payment.dto';
import dayjs from 'dayjs';

export const PaymentPresenter = (payment: Payment): PaymentDto => {
  const amount = payment.match.amount;
  return {
    id: payment.id.toString(),
    amount,
    paymentDate: dayjs(payment.paymentDate).format('DD/MM/YYYY'), 
    paymentMethod: payment.paymentMethod,
    match: {
      id: payment.match.id.toString(),
      name: payment.match.name,
    },
    user: {
      id: payment.user.id.toString(),
      name: payment.user.name,
    },
  };
};