import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman{
    username: string;
    password: string;

}

export class AuthenticateDeliverymanUseCase{
    async execute({username, password}: IAuthenticateDeliveryman){
        // Receber username , password

        //verificar se username cadastrado
        const Deliveryman = await prisma.deliveryman.findFirst({
            where:{
                username
            }
        })

        if(!Deliveryman){
            throw new Error('Username or password invalid!')
        }

        //verificar se senha e username correspondem
        const passwordMatch = await compare(password, Deliveryman.password)

        if(!passwordMatch){
            throw new Error('Username or password invalid!')
        }

        //Gerar o tokem
        const token = sign({username}, "bab138e1417df56b214ebd11dad7b1ff", {
            subject: Deliveryman.id,
            expiresIn:"1d"
        })

        return token

    }
}