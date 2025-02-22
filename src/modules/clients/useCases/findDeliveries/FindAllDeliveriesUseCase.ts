import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase{
    async execute(id_client: string){
        console.log(id_client)
        const deliveries = await prisma.clientes.findMany({
            where:{
                id: id_client
            },
            select:{
                deliveries: true,
                id: true,
                username: true
            }
        })

        return deliveries
    }
}