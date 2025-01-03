export const createPaymentSchema = {
    description: 'Create a new payment for a match',
    tags: ['Payment'],
    summary: 'Create payment',
    body: {
      type: 'object',
      required: ['amount', 'paymentDate', 'paymentMethod', 'match'],
      properties: {
        amount: { type: 'number', description: 'Amount of the payment' },
        paymentDate: { type: 'string', format: 'date-time', description: 'Date of the payment' },
        paymentMethod: { type: 'string', description: 'Method of the payment' },
        match: { type: 'string', description: 'ID of the match' },
        user: { type: 'string', description: 'ID of the user making the payment' },
      },
    },
    response: {
      201: {
        description: 'Payment created successfully',
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID of the payment' },
          amount: { type: 'number', description: 'Amount of the payment' },
          paymentDate: { type: 'string', format: 'date-time', description: 'Date of the payment' },
          paymentMethod: { type: 'string', description: 'Method of the payment' },
          match: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID of the match' },
              name: { type: 'string', description: 'Name of the match' },
            },
          },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID of the user' },
              name: { type: 'string', description: 'Name of the user' },
            },
          },
        },
      },
      401: {
        description: 'Unauthorized access error message',
        type: 'object',
        properties: {
          error: { type: 'string', description: 'Unauthorized access error message' },
        },
      },
    },
  };