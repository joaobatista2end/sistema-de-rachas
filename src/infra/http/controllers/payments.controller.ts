import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { FetchPaymentUseCase } from '../../../domain/use-cases/payment/fetch-payment.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';
import { GetFinancialReportUseCase } from '../../../domain/use-cases/payment/get-financial-report.usecase';

class PaymentController {
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

  async getDashboard(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const user = req.user as any;
    const result = await GetFinancialReportUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send({
      data: result.value
    });
  }
}

export default new PaymentController();
