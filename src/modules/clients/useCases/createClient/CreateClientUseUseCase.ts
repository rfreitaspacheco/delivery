import { prisma } from "../../../../database/prismaClient";
import { hash} from 'bcrypt'


interface ICreateClient{
    username: string;
    password: string
}

export class CreateClientUseCase{

    async execute({password, username}: ICreateClient){
        // Validar se o usuário existe
        const clientExist = await prisma.clientes.findFirst({
            where:{
                username:{
                    equals: username,
                    mode:"insensitive"
                }
            }
        })

        if(clientExist){
            throw new Error("Client already exists")
        }

        //Criptografar a senha
        const hashPassword = await hash(password, 10)

        //Salvar o client
        const client = await prisma.clientes.create({
            data:{
                username,
                password: hashPassword
            }
        })

        return client
    }
}