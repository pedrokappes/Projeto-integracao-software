import axios from "axios";
import { response } from "express";
import { Cliente } from "../models/cliente.models";

export class AxiosCliente {
    async buscar(carro): Promise<{mensagem: string; cliente?: Cliente}> {
        try {
            console.log(carro.clienteId)
            const resposta = await axios.get(` http://127.0.0.1:5000/cliente/${carro.clienteId}`);
            if (resposta.data.mensagem === 'Cliente não encontrado') {
                return {mensagem: "NOK"};
            }
            console.log(resposta.data.mensagem)
            return {mensagem:"OK", cliente: resposta.data};

        } catch (error) {
            return {mensagem:"NOK"};
        }
    }
}