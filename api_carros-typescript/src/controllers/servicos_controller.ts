import { Response } from 'express';
import { Request } from 'express';
import { Vaga } from '../models/vaga.models';
import { VagaDB } from '../data/vaga_repository';

const vagaDB = new VagaDB();

export class ServicoController {

    async CadastrarVaga(request: Request, response: Response) {
        let vaga: Vaga = {
            vazia: true
        }
        const vagas = await vagaDB.cadastrar(vaga);

        return response.status(200).json({
            message: "Vaga cadastrada",
            data: vagas
        });

    }

    async DeletarVaga(request: Request, response: Response) {
        const vaga = await vagaDB.deletar(parseInt(request.params.id));

        if (!vaga) {
            return response.status(200).json({
                mensagem: "Nenhum vaga encontrado"
            });
        }
        return response.status(200).json({
            message: "Vaga excluído com sucesso",
            data: vaga
        });

    }

    async ListarVaga(request: Request, response: Response) {
        const vaga = await vagaDB.listar();
        response.json(vaga).status(200);

    }

    async VagasDisponivel(request: Request, response: Response){
        const vaga = await vagaDB.vagasDisponivel();
        response.json(vaga).status(200);
    }

    async Calcularpreco(request: Request, response: Response) {
    }



}