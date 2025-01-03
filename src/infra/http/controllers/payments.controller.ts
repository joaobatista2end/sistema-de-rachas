import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { FetchPaymentUseCase } from '../../../domain/use-cases/payment/fetch-payment.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';

class PaymentController {
  async findByUser(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const result = await FetchPaymentUseCase.execute(id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: result.value.map((payment) => PaymentPresenter(payment)),
    });
  }
}

export default new PaymentController();
