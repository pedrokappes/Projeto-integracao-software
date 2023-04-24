import { Response } from 'express';
import { Request } from 'express';
import { CarroBD } from '../data/carros_repository';
import { Carro } from '../models/carro.models';

const carroBD = new CarroBD();

export class CarroController {

    async paginaInicial(request: Request, response: Response) {
        response.json('Pagina inicial');
    }

    async Listarcarros(request: Request, response: Response) {
        const carroLista = await carroBD.listar();
        response.json(carroLista).status(200);
    }

    async Buscarcarro(request: Request, response: Response) {
        const carro = await carroBD.buscar(parseInt(request.params.id))

        if (!carro) {
            return response.status(200).json({
                message: "Carro não encontrado"
            });
        }
        return response.status(200).json({
            message: "Carro encontrado com sucesso",
            data: carro
        });

    }

    async Cadastrarcarro(request: Request, response: Response) {
        let carro: Carro = request.body;
        carro = await carroBD.cadastrar(carro);

        return response.status(200).json({
            message: "Produto cadastrado",
            data: carro
        });

    }
    async Alterarcarro(request: Request, response: Response) {
        const carro: Carro = request.body;
        carro.id = parseInt(request.params.id);

        const carroAtualizado = await carroBD.atualizar(carro);

        if (!carroAtualizado) {
            return response.status(200).json({
                message: "Carro não encontrado"
            });
        } else {
            return response.status(200).json({
                message: "Carro atualizado com sucesso",
                data: carroAtualizado
            });
        }
    }

    async Deletarcarro(request: Request, response: Response) {
        const carro = await carroBD.deletar(parseInt(request.params.id));

        if (!carro) {
            return response.status(200).json({
                 mensagem: "Nenhum produto encontrado" 
            });
        }
        return response.status(200).json({
            message: "Produto excluido com sucesso",
            data: carro
        });
    }
}