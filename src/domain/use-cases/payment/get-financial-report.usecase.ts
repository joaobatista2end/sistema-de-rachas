import { PaymentMongoRepository } from '../../../infra/database/repositories/mongoose/payment.repository';
import { PaymentRepository } from '../../../infra/database/repositories/payment.repository';
import PaymentModel from '../../../infra/database/mongose/models/payment.model';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';

interface FinancialReport {
  totalMatches: number;
  totalDiscounts: number;
  totalRevenue: number;
}

export class GetFinancialReportUseCase {
  private static readonly repository: PaymentRepository =
    new PaymentMongoRepository(PaymentModel);

  public static async execute(userId: string): Promise<Either<HttpError, FinancialReport>> {
    try {
      const payments = await GetFinancialReportUseCase.repository.findByUser(userId);

      if (!payments.length) {
        return right({
          totalMatches: 0,
          totalDiscounts: 0,
          totalRevenue: 0
        });
      }

      const report = payments.reduce((acc, payment) => {
        if (payment) {
          acc.totalMatches++;
          acc.totalDiscounts += payment.discount || 0;
          acc.totalRevenue += payment.totalAmountWithDiscount;
        }
        return acc;
      }, {
        totalMatches: 0,
        totalDiscounts: 0,
        totalRevenue: 0
      });

      return right(report);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error instanceof Error ? error.message : 'Erro ao obter relatório financeiro'
        )
      );
    }
  }
} 