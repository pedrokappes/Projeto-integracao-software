import { Response } from 'express';
import { Request } from 'express';
import { Vaga } from '../models/vaga.models';
import { VagaDB } from '../data/vaga_repository';
import { CarroBD } from '../data/carros_repository';

const vagaDB = new VagaDB();
const carroDB = new CarroBD();

export class ServicoController {

    async CadastrarVaga(request: Request, response: Response) {
        const vagas = await vagaDB.cadastrar();

        return response.status(200).json({
            message: "Vaga cadastrada",
            data: vagas
        });

    }

    async DeletarVaga(request: Request, response: Response) {
        let vaga: Vaga | null = await vagaDB.buscar(parseInt(request.params.id));

        if (!vaga) {
            return response.status(200).json({
                mensagem: "Nenhum vaga encontrado"
            });
        }

        if (vaga.carroId != 0) {
            return response.status(200).json({
                mensagem: "Vaga não pode ser excluida, possui um carro"
            });
        }
        vaga = await vagaDB.deletar(parseInt(request.params.id));


        return response.status(200).json({
            message: "Vaga excluído com sucesso",
            data: vaga
        });

    }

    async ListarVaga(request: Request, response: Response) {
        const vaga: Vaga[] = await vagaDB.listar();
        response.json(vaga).status(200);

    }

    async VagasDisponivel(request: Request, response: Response) {
        const vaga = await vagaDB.vagasDisponivel();
        response.json(vaga).status(200);
    }

    async EntradaCarro(request: Request, response: Response) {
        const entradaCarro = request.body;
        entradaCarro.vazia = false;
        const carro = await carroDB.buscar(parseInt(entradaCarro.carroId));
        if (!carro) {
            return response.status(200).json({
                message: "Verifique o id do carro"
            });
        }
        let vaga: Vaga | null = await vagaDB.buscar(parseInt(entradaCarro.id))
        if (!vaga) {
            return response.status(200).json({
                message: "Verifique o id da vaga"
            });
        }
        if (vaga?.carroId != 0) {
            return response.status(200).json({
                message: "Vaga ja possui um carro"
            });
        }

        vaga = await vagaDB.atualizar(entradaCarro)
        if (vaga?.carroId != 0) {
            return response.status(200).json({
                message: "Entradada com sucesso",
                data: vaga
            });
        }

        return response.status(200).json({
            message: "Erro ao dar entrada de veiculo"
        });

    }

    async SaidaVeiculo(request: Request, response: Response) {
        const vaga = await vagaDB.buscar(parseInt(request.params.id));

        if(!vaga){
            return response.status(200).json({
                message: "Favor verifique o numero da vaga"
            })
        }
        if(vaga.carroId == 0){
            return response.status(200).json({
                message: "Não possui nenhum carro nessa vaga"
            })
        }

        vaga.horaSaida = parseFloat(request.params.saida);
        const valorPagar = (vaga.horaSaida - vaga.horaEntrada)*12;

        const vagaVazia: Vaga = {
            id: vaga.id,
            vazia: true,
            carroId: 0,
            horaEntrada: 0,
            horaSaida: 0
           
        }
        await vagaDB.atualizar(vagaVazia);

        return response.status(200).json({
            message: "Saida realizada com sucesso",
            data: vaga,
            "Valor a pagar": `R$:${valorPagar.toFixed(2)}`
        })
        

    }



}