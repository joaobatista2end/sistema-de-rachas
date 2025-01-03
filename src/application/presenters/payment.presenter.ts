import { Payment } from '../../domain/entities/payment';
import { PaymentDto } from '../../domain/dto/payment.dto';

export class PaymentPresenter {
  static toDto(payment: Payment): PaymentDto {
    return {
      id: payment.id,
      amount: payment.amount,
      paymentDate: PaymentPresenter.formatDate(payment.paymentDate),
      paymentMethod: payment.paymentMethod,
      match: {
        id: payment.match.id,
        name: payment.match.name,
      },
      user: {
        id: payment.user.id,
        name: payment.user.name,
      },
    };
  }

  private static formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}