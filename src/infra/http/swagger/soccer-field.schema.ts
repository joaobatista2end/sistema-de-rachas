import { FastifySchema } from 'fastify';

export const deleteSoccerFieldSchema: FastifySchema = {
  tags: ['Campo'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID of the soccer field to delete' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Confirmation message for successful deletion',
        },
      },
      example: { message: 'Soccer field deleted successfully' },
    },
    404: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Error message if soccer field not found',
        },
      },
      example: { error: 'Soccer field not found' },
    },
    401: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Unauthorized access error message',
        },
      },
      example: { error: 'Unauthorized' },
    },
  },
};

export const createSoccerFieldSchema: FastifySchema = {
  tags: ['Campo'],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name of the soccer field' },
      pixKey: { type: 'string', description: 'Pix key for payment' },
      rentalValue: {
        type: 'number',
        description: 'Rental value for the field',
      },
      workStartTime: {
        type: 'string',
        format: 'time',
        description: 'Start time of operation (HH:mm:ss)',
      },
      workFinishTime: {
        type: 'string',
        format: 'time',
        description: 'Finish time of operation (HH:mm:ss)',
      },
      workDays: {
        type: 'array',
        items: { type: 'string' },
        description: 'Days of the week when the field is available',
      },
    },
    required: [
      'name',
      'pixKey',
      'rentalValue',
      'workStartTime',
      'workFinishTime',
      'workDays',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the created soccer field' },
        name: { type: 'string', description: 'Name of the soccer field' },
        pixKey: { type: 'string', description: 'Pix key for payment' },
        rentalValue: {
          type: 'number',
          description: 'Rental value for the field',
        },
        workStartTime: {
          type: 'string',
          format: 'time',
          description: 'Start time of operation',
        },
        workFinishTime: {
          type: 'string',
          format: 'time',
          description: 'Finish time of operation',
        },
        workDays: {
          type: 'array',
          items: { type: 'string' },
          description: 'Days of the week when the field is available',
        },
      },
      example: {
        id: '123456',
        name: 'campo do zé',
        pixKey: 'Campo do zézinho2',
        rentalValue: 150,
        workStartTime: '10:00:00',
        workFinishTime: '21:00:00',
        workDays: ['segunda', 'sexta'],
      },
    },
    400: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Error message if validation fails',
        },
      },
      example: { error: 'Invalid request data' },
    },
    401: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Unauthorized access error message',
        },
      },
      example: { error: 'Unauthorized' },
    },
  },
};
