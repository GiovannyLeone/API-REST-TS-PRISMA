import e, { Request, Response, NextFunction } from 'express'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    // Aguardando conexão com o banco
    await prisma.$connect()
    // criando uma variavel que consulta no banco, "prisma.user.findMany()" jeito do PRISMA de consultar todos o dados de uma tabela no banco
    const result = await prisma.user.findMany({
        include: {
            profile: true
        }
    })

    return res.status(200).json({
        message: result
    })
}

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    let firstname: string = req.body.firstname
    let lastname: string = req.body.lastname
    let email: string = req.body.email 
    let username: string = req.body.username || firstname + lastname
    let password: string = req.body.password
    let biography: string = req.body.bio
    // Aguardando conexão com o banco
    await prisma.$connect()
     // criando uma variavel de resultado
    const result = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            hash: "123456789",
                profile: {
                    create: { bio: biography }
                }
        }
    })

    return res.status(201).json({
        message: result
    })
}

export default { getAllUsers, addUser }