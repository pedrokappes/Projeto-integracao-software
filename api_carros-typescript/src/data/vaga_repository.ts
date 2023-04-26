import { PrismaClient } from "@prisma/client";
import { Vaga } from "../models/vaga.models";

const prisma = new PrismaClient()


export class VagaDB {
    //Verificar ANY
    async listar(): Promise<any[]> {
        return await prisma.vaga.findMany()
    }

    async vagasDisponivel(){
        return await prisma.vaga.count({
            where: {
                vazia: true
            }
        })
    }

    async cadastrar(vaga): Promise<Vaga> {
        vaga = prisma.vaga.create({
            data: {
                vazia: true,
                carroId: 0
            }
        })

        return vaga
    }
    //Verificar ANY
    async deletar(id: number): Promise<any | null>  {
        try {
            const vaga = await prisma.vaga.delete({
                where: {
                    id: id
                }
            })
            return vaga;
        }
        catch {
            return null;
        }

    }
    
}