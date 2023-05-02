import { PrismaClient } from "@prisma/client";
import { Vaga } from "../models/vaga.models";

const prisma = new PrismaClient()


export class VagaDB {
    async listar(): Promise<Vaga[]> {
        return await prisma.vaga.findMany()
    }

    async buscar(id: number): Promise<Vaga | null> {
       try {
        return await prisma.vaga.findUnique({
            where: {
                id: id
            }
        })
       } catch (error) {
        return null
       }
    }

    async vagasDisponivel() {
        return await prisma.vaga.count({
            where: {
                vazia: true
            }
        })
    }

    async cadastrar(): Promise<Vaga> {
        const vaga = prisma.vaga.create({
            data: {
                vazia: true,
                carroId: 0,
                horaEntrada: 0,
                horaSaida: 0
            }
        })

        return vaga
    }
    async deletar(id: number): Promise<Vaga | null> {
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

    async atualizar(entradaCarro): Promise<Vaga | null> {
        try {
            const vaga = await prisma.vaga.update(
                {
                    where: {
                        id: entradaCarro.vagaId
                    },
                    data: {
                        vazia: false,
                        carroId: entradaCarro.carroId,
                        horaEntrada: entradaCarro.horaEntrada
                    }
                }
            )
            return vaga
        } catch (error) {
            return null
        }
    }
}