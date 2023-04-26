import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Carro',
      version: '1.0.0',
      description: 'Descrição da API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['src/router/carros_router.ts']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
