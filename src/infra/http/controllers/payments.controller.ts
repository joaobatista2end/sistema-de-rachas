import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { FetchPaymentUseCase } from '../../../domain/use-cases/payment/fetch-payment.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';
import { GetFinancialReportUseCase } from '../../../domain/use-cases/payment/get-financial-report.usecase';
import { PaymentMongoRepository } from '../../database/repositories/mongoose/payment.repository';
import PaymentModel from '../../database/mongose/models/payment.model';

export interface GetFinancialReportQueryParams {
  startDate?: string;
  endDate?: string;
  soccerFieldId?: string;
  clientId?: string;
}

class PaymentController {
  private readonly paymentRepository: PaymentMongoRepository;
  private readonly getFinancialReportUseCase: GetFinancialReportUseCase;

  constructor() {
    try {
      this.paymentRepository = new PaymentMongoRepository(PaymentModel);
      this.getFinancialReportUseCase = new GetFinancialReportUseCase(this.paymentRepository);
    } catch (error) {
      console.error('Erro ao inicializar PaymentController:', error);
      throw error;
    }
  }

  async findByUser(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const user = req.user as any;
    const result = await FetchPaymentUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: result.value.map((payment) => PaymentPresenter(payment)),
    });
  }

  async getFinancialReport(
    req: FastifyRequest<{
      Querystring: GetFinancialReportQueryParams;
    }>,
    res: FastifyReply
  ) {
    try {
      const user = req.user as any;
      console.log('Usuário requisitando relatório:', user);
      
      const { startDate, endDate, soccerFieldId, clientId } = req.query;
      console.log('Filtros recebidos:', { startDate, endDate, soccerFieldId, clientId });

      const filters = {
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(soccerFieldId && { soccerFieldId }),
        ...(clientId && { clientId }),
      };

      const result = await this.getFinancialReportUseCase.execute(user.id, filters);

      if (result.isLeft()) {
        console.error('Erro no caso de uso:', result.value);
        return res.status(result.value.code).send(result.value.message);
      }

      return res.status(HttpStatusCode.OK).send({
        data: result.value,
      });
    } catch (error) {
      console.error('Erro não tratado no controller:', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: 'Erro interno ao gerar relatório financeiro',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}

export default new PaymentController();
