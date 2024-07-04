import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController{
    async handle(request: Request, responde: Response){
        const {  item_name} = request.body
        const { id_client} =  request
        const createDeliveyUseCase = new CreateDeliveryUseCase()

        const delivery = await createDeliveyUseCase.execute({
            id_client,
            item_name
        })


        return responde.json(delivery)
    }



    
}