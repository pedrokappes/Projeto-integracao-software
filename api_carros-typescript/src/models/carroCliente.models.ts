import { Cliente } from "./cliente.models";

export interface CarroCliente {
    id: number,
    placa: string,
    modelo: string,
    clienteId: number;
    cliente?: Cliente
}
