import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient{
    username: string;
    password: string;

}

export class AuthenticateClientUseCase{
    async execute({username, password}: IAuthenticateClient){
        // Receber username , password

        //verificar se username cadastrado
        const client = await prisma.clientes.findFirst({
            where:{
                username
            }
        })

        if(!client){
            throw new Error('Username or password invalid!')
        }

        //verificar se senha e username correspondem
        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch){
            throw new Error('Username or password invalid!')
        }

        //Gerar o tokem
        const token = sign({username}, "bab138e1417df56b214ebd11dad7b1fe", {
            subject: client.id,
            expiresIn:"1d"
        })

        return token

    }
}