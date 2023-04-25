import { Response, Request } from 'express';
import { CarroBD } from '../data/carros_repository';
import { Carro } from '../models/carro.models';
import { AxiosCliente } from '../axiosCliente/axiosCliente';

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
        if ("clienteId" in carro) {

            const axiosCliente = new AxiosCliente()
            const {mensagem} = await axiosCliente.buscar(carro)
            if (mensagem) {
                if (mensagem === "OK") {
                    carro = await carroBD.cadastrar(carro);

                    return response.status(200).json({
                        message: "Carro cadastrado",
                        data: carro
                    });
                } 
            }
            return response.status(200).json({
                message: "Verifique a Api/Id de cliente(s)",
            });

        }
        else {
            return response.status(200).json({
                message: "Favor informe o id do cliente"
            });
        }
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
                mensagem: "Nenhum veículo encontrado"
            });
        }
        return response.status(200).json({
            message: "Veículo excluído com sucesso",
            data: carro
        });
    }
}