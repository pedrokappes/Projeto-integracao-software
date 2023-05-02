import { AxiosCliente } from "../axiosCliente/axiosCliente";
import { Carro } from "../models/carro.models";

import { PrismaClient } from "@prisma/client";
import { CarroCliente } from "../models/carroCliente.models";


const prisma = new PrismaClient();

export class CarroBD {

    async listar(): Promise<Carro[]> {
        return await prisma.carro.findMany();
    }
    
    async buscar(id: number): Promise<CarroCliente | null> {
        try {
            const carro: Carro | null = await prisma.carro.findUnique(
                {
                    where: {
                        id: id
                    }
                }
            )
            const axiosCliente = new AxiosCliente()
            const {mensagem, cliente} = await axiosCliente.buscar(carro)
            if (mensagem && cliente && carro != null) {
                if (mensagem === "OK") {
                    const carroCliente:CarroCliente = carro
                    carroCliente.cliente = cliente;
                    return carroCliente
                } 
            }
            return null
        }
        catch {
            return null
        }
    }

    async cadastrar(carro: Carro): Promise<Carro> {
            carro = await prisma.carro.create({
                data: {
                    placa: carro.placa,
                    modelo: carro.modelo,
                    clienteId: carro.clienteId
                }
            })
            return carro;
    }
    async atualizar(carro: Carro): Promise<Carro | null> {
        try {
            const carroAtualizado = await prisma.carro.update(
                {
                    where: {
                        id: carro.id
                    },
                    data: {
                        placa: carro.placa,
                        modelo: carro.modelo,
                        clienteId: carro.clienteId
                    }
                }
            )
            return carroAtualizado;

        }
        catch {
            return null;
        }
    }
    async deletar(id: number): Promise<Carro | null> {
        try {
            const carro = await prisma.carro.delete({
                where: {
                    id: id
                }
            })
            return carro;
        }
        catch {
            return null;
        }

    }

}