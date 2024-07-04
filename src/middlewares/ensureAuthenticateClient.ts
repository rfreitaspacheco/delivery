import { NextFunction, Request, Response, response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string
}

export async function ensureAuthenticateClient(request:Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({
           message: "Token missing"
        })
    }

    const [,token] = authHeader.split(" ")

    try{
       const { sub} = verify(token, "bab138e1417df56b214ebd11dad7b1fe") as IPayload

       request.id_client = sub
       return next()

    }catch(err){
        return response.status(401).json({
            message: "Invalid Token"
        })
    }
    
    
}