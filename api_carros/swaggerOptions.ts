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
        url: 'http://localhost:6000'

      },
      {
        url: 'http://localhost:6001'

      },
      {
        url: 'http://localhost:6002'
      },
      {
        url: 'http://localhost:6003'
      },
      {
        url: 'http://localhost:6004'
      },
      {
        url: 'http://localhost:6005'
      },
      {
        url: 'http://localhost:6006'
      },
      {
        url: 'http://localhost:6007'
      },
      {
        url: 'http://localhost:6008'
      },
      {
        url: 'http://localhost:6009'
      },
      {
        url: 'http://localhost:6010'
      },
      {
        url: 'http://localhost:6011'
      },
    ]
  },
 apis: ['microservices/cadstro_carro/cadastro_carro.ts', 'microservices/listar_carro/listar_carro.ts', 'microservices/deletar_carro/deletar_carro.ts','microservices/buscar_carro/buscar_carro.ts',
 'microservices/consulta_fipe/consulta_fipe.ts','microservices/alterar_carro/alterar_carro.ts', 'microservices/listar_vagas/listar_vagas.ts', 'microservices/cadastrar_vagas/cadastrar_vagas.ts',
 'microservices/verificar_vagas/verificar_vagas.ts', 'microservices/deletar_vaga/deletar_vaga.ts', 'microservices/entrada_carro/entrada_carro.ts',
 'microservices/saida_carro/saida_carro.ts' ]

};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
