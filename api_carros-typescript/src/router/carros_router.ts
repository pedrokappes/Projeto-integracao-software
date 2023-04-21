import { Router } from "express";
import { Request, Response } from "express";


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

router.get("/", (req: Request, res: Response) => {
    res.json('Casa')
});

/**
 * @swagger
 * /Carro:
 *   post:
 *     summary: Retorna todos os usuários.
 *     responses:
 *       200:
 *         description: Lista de usuários.
 */
router.post("/carro", (req: Request, res: Response) => {
    res.json('Teste')
});



export { router };