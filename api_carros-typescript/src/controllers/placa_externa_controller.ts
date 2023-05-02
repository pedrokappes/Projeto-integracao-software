import { Request, Response } from "express";
import axios from "axios";
import { CarroBD } from "../data/carros_repository";

const carros_repository = new CarroBD();

export class PlacaExternaController {
  async testar(request: Request, response: Response) {
    const { placa } = request.params;
    await axios
      .get(`https://placaconsultar.com.br/Checkouts/${placa}?type=Basica`)
      
      .then((resposta) => {
        console.log(resposta.data.ano);
      });
  }
}
