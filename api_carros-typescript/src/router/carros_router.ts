import { Router } from "express";
import { CarroController } from "../controllers/carro_controller";
import { ServicoController } from "../controllers/servicos_controller";

const router: Router = Router();
router.get("/", new CarroController().paginaInicial);

/**
 * @swagger
 * /Carro:
 *   get:
 *     summary: Retorna todos os carros cadastrados.
 *     responses:
 *       200:
 *         description: Lista de carros.
 */
router.get("/carro", new CarroController().Listarcarros);

/**
 * @swagger
 * /Carro/{id}:
 *   get:
 *     summary: Retorna o carro baseado no id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do carro a ser retornado.
 *     responses:
 *       200:
 *         description: Carro com o ID escolhido.
 */
router.get("/carro/:id", new CarroController().Buscarcarro);

/**
 * @swagger
 * /Carro:
 *   post:
 *     summary: Cadastra um carro novo.
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             placa: abc-12345
 *             modelo: Uno
 *             clienteId: 1
 *             codigoFipe: 01235-8
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               modelo:
 *                 type: string
 *               clienteId:
 *                 type: integer
 *               codigoFipe:
 *                 type: string
 *              
 *              
 *     responses:
 *       200:
 *         description: Dados do carro cadastrado.
 */
router.post("/carro", new CarroController().Cadastrarcarro);

/**
 * @swagger
 * /Carro/{id}:
 *   put:
 *     summary: Altera dados de um carro.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do carro a ser alterado.
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             placa: cde-4567
 *             modelo: Fusca
 *             codigoFipe: 004217-0
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               modelo:
 *                 type: string
 *               codigoFipe:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Carro alterado com sucesso.
 */
router.put("/carro/:id", new CarroController().Alterarcarro);

/**
 * @swagger
 * /Carro/{id}:
 *   delete:
 *     summary: Deleta um carro.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do carro a ser deletado
 *     responses:
 *       200:
 *         description: Deletado com sucesso.
 */
router.delete("/carro/:id", new CarroController().Deletarcarro);

/**
 * @swagger
 * /vaga/disponivel:
 *   get:
 *     summary: Verifica a quantidade de vagas disponiveis.
 *     responses:
 *       200:
 *         description: quantidade disponível das vagas.
 */
router.get("/vaga/disponivel", new ServicoController().VagasDisponivel);

/**
 * @swagger
 * /Vaga:
 *   get:
 *     summary: Lista e Apresenta todas as vagas e seus respectivos atributos.
 *     responses:
 *         200:
 *         description: quantidade disponível das vagas.
 */
router.get("/vaga", new ServicoController().ListarVaga);

/**
 * @swagger
 * /Vaga/Cadastrar:
 *   get:
 *     summary: Gera uma nova vaga e cadastra no sistema.
 *     responses:
 *       200
 */
router.get("/vaga/cadastrar", new ServicoController().CadastrarVaga);


/**
 * @swagger
 * /Vaga/{id}:
 *   delete:
 *     summary: Deleta uma vaga.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da vaga a ser deletada
 *     responses:
 *       200:
 *         description: Deletada com sucesso.
 */
router.delete("/vaga/:id", new ServicoController().DeletarVaga);

/**
* @swagger
* /Vaga:
*   post:
*     summary: Dá entrada de um carrro em uma determinada vaga.
*     requestBody:
*       content:
*         application/json:
*           example:
*             id: 15
*             carroId: 5
*             horaEntrada: 12
*             horaSaida: 0
*           schema:
*             type: object
*             properties:
*               id:
*                 type: integer
*               carroId:
*                 type: integer
*               horaEntrada:
*                 type: integer        
*               horaSaida:
*                 type: integer          
*              
*     responses:
*       200:
*         description:  O horário de entrada deve ser escrito com número (exemplo 12h = 12).
*/

router.post("/vaga", new ServicoController().EntradaCarro);


/**
 * @swagger
 * /SaidaVeiculos/{id}/{saida}:
 *   get:
 *     summary: Define o horário de saída de um veículo baseado no ID da vaga.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true 
 *         description: ID da vaga a ser usada.
 *       - in: path
 *         name: saida
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Escreva o horário de saída do veículo.
 *     responses:
 *       200:
 *         description: O horário de saída deve ser escrito com número (exemplo 17h = 17).
 */
router.get("/saidaVeiculos/:id/:saida", new ServicoController().SaidaVeiculo);

/**
 * @swagger
 * /ConsultaFipe/{id}:
 *   get:
 *     summary: Retorna os dados detalhados do carro baseado no código Fipe.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do carro a ser retornado.
 *     responses:
 *       200:
 *         description: Informações encontradas com código Fipe.
 */
router.get("/consultaFipe/:id", new ServicoController().ConsultaFipe)

export { router };