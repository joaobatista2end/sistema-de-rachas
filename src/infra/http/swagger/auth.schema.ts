export const registerSwaggerSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', description: 'The name of the user' },
      email: {
        type: 'string',
        format: 'email',
        description: 'The email address of the user',
      },
      password: {
        type: 'string',
        description: 'The password of the user',
        format: 'password',
      },
      photoUrl: {
        type: 'string',
        format: 'uri',
        description: "Optional URL for the user's profile photo",
        nullable: true,
      },
      role: {
        type: 'number',
        description: 'Role of user',
        nullable: false,
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the newly created user',
        },
        name: { type: 'string', description: 'The name of the user' },
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
        },
        photoUrl: {
          type: 'string',
          format: 'uri',
          description: "The URL of the user's profile photo",
        },
        role: {
          type: 'number',
          description: 'Role of user',
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const loginSwaggerSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'The email address of the user',
      },
      password: {
        type: 'string',
        description: 'The password of the user',
        format: 'password',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'Token do usuário',
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
