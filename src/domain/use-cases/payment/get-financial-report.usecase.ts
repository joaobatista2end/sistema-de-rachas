import { PaymentRepository } from '../../../infra/database/repositories/payment.repository';
import { FinancialReport } from '../../entities/financial-report';
import { Payment } from '../../entities/payment';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

interface FinancialReportFilters {
  startDate?: Date;
  endDate?: Date;
  soccerFieldId?: string;
  clientId?: string;
}

export class GetFinancialReportUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(
    ownerId: string,
    filters?: FinancialReportFilters
  ): Promise<Either<HttpError, FinancialReport>> {
    try {
      console.log('Buscando pagamentos para o dono:', ownerId);
      const payments = (await this.paymentRepository.findByUser(ownerId)).filter((payment): payment is Payment => payment !== null);
      console.log('Pagamentos encontrados:', payments.length);

      if (payments.length === 0) {
        return right({
          totalMatches: 0,
          totalDiscounts: 0,
          totalRevenue: 0
        });
      }

      let filteredPayments = payments;

      if (filters?.startDate) {
        console.log('Filtrando por data inicial:', filters.startDate);
        filteredPayments = filteredPayments.filter(
          payment => new Date(payment.paymentDate) >= new Date(filters.startDate!)
        );
      }

      if (filters?.endDate) {
        console.log('Filtrando por data final:', filters.endDate);
        filteredPayments = filteredPayments.filter(
          payment => new Date(payment.paymentDate) <= new Date(filters.endDate!)
        );
      }

      if (filters?.soccerFieldId) {
        console.log('Filtrando por campo:', filters.soccerFieldId);
        filteredPayments = filteredPayments.filter(
          payment => payment.match.soccerField.id === filters.soccerFieldId
        );
      }

      if (filters?.clientId) {
        console.log('Filtrando por cliente:', filters.clientId);
        filteredPayments = filteredPayments.filter(
          payment => payment.user.id === filters.clientId
        );
      }

      console.log('Pagamentos após filtros:', filteredPayments.length);

      const report: FinancialReport = {
        totalMatches: filteredPayments.length,
        totalDiscounts: filteredPayments.reduce((sum, p) => sum + (p.discount || 0), 0),
        totalRevenue: filteredPayments.reduce((sum, p) => sum + p.totalAmountWithDiscount, 0)
      };

      return right(report);
    } catch (error) {
      console.error('Erro ao gerar relatório financeiro:', error);
      if (error instanceof Error) {
        return left(new HttpError(500, `Erro ao gerar relatório financeiro: ${error.message}`));
      }
      return left(new HttpError(500, 'Erro ao gerar relatório financeiro'));
    }
  }
} 