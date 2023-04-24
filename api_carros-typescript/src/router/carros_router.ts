import { Router } from "express";
import { Request, Response } from "express";
import { CarroController } from "../controllers/carro_controller";
import { ServicoController } from "../controllers/servicos_controller";

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Pagina inicial.
 *     responses:
 *       200:
 *         description: Pagina inicial.
 */

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
 * /BuscarCarro:
 *   get:
 *     summary: Retorna o carro baseado na placa/id.
 *     responses:
 *       200:
 *         description: carro com placa/id escolhido.
 */
router.get("/carro/:id", new CarroController().Buscarcarro);

/**
 * @swagger
 * /Carro:
 *   post:
 *     summary: Cadastra um carro novo.
 *     responses:
 *       200:
 *         description: Dados do carro cadastrado.
 */
router.post("/carro", new CarroController().Cadastrarcarro);

/**
 * @swagger
 * /AlterarCarro:
 *   put:
 *     summary: Altera dados de um carro.
 *     responses:
 *       200:
 *         description: Alterado com sucesso!
 */
router.put("/carro/:id", new CarroController().Alterarcarro);

/**
 * @swagger
 * /DeletarCarro:
 *   delete:
 *     summary: Deleta um carro.
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