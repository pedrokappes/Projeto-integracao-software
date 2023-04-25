import { Router } from "express";
import { Request, Response } from "express";
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
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               modelo:
 *                 type: string
 *               clienteId:
 *                 type: integer
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
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               modelo:
 *                 type: string
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
 * /VerificarDisponibilidade:
 *   get:
 *     summary: Verifica as vagas disponiveis.
 *     responses:
 *       200:
 *         description: Lista das vagas.
 */
router.get("/vaga", new ServicoController().Verificarvaga);

/**
 * @swagger
 * /CalcularPreço:
 *   get:
 *     summary: Realiza o cálculo do preço a ser pago.
 *     responses:
 *       200:
 *         description: Resultado da conta.
 */
router.get("/preco", new ServicoController().Calcularpreco);


export { router };