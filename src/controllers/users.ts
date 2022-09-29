import e, { Request, Response, NextFunction } from 'express'
import { PrismaClient } from "@prisma/client";

// Fazendo um require da lib Bcrypt
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    // Aguardando conexão com o banco
    await prisma.$connect()
    // criando uma variavel que consulta no banco, "prisma.user.findMany()" jeito do PRISMA de consultar todos o dados de uma tabela no banco
    const result = await prisma.user.findMany({
        // Fazendo um SELECT de SQL, em forma ed JSON
        select: {
            firstname: true,
            lastname: true,
            email: true,
            username: true,
            profile: true
        }
    })

    return res.status(200).json({
        message: result
    })
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    // Consultando um usuário pela id
    let idUser: number = Number(req.params.id)

    await prisma.$connect()
    const result = await prisma.user.findUnique({
        // Fazendo um SELECT de SQL, em forma ed JSON
        select: {
            firstname: true,
            lastname: true,
            email: true,
            username: true,
            profile: true
        },
        // Fazendo um WHERE de SQL, em forma ed JSON
        where: {
            id: idUser
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

    // Encryptando dados do User, usando Await para esperando a função executar e ser criada
    let cryptPassword = await createHash(password)
    let hash = await createHash(email + password)


    // Aguardando conexão com o banco
    await prisma.$connect()
    // criando uma variavel de resultado
    const result = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: cryptPassword,
            hash: hash,
            // Cadastrando a bio da tabela profile junto com a tabela User
            profile: {
                create: { bio: biography }
            }
        }
    })
    // Status 201 como resposta para uma requisição de cadastro
    return res.status(201).json({
        message: result
    })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const reqIdUser: number = Number(req.params.id)
    const reqFirstname: string = req.body.firstname
    const reqLastname: string = req.body.lastname
    const reqUsername: string = req.body.username
    const reqEmail: string = req.body.email
    const reqPassword: string = req.body.password
    const reqHash: string = req.body.hash

    let firstnameRes = ""
    let lastnameRes  = ""
    let usernameRes  = ""
    let emailRes     = ""
    let passwordRes  = ""
    let hashRes      = ""

    // let hash = await createHash(reqEmail + reqPassword)
    try {
        await prisma.$connect()
        const result = await prisma.user.findUnique({
            // Fazendo um WHERE de SQL, em forma ed JSON
            where: {
                id: reqIdUser
            }
        })

        if (result) {
            // Verifcando dados recebidos
            firstnameRes = reqFirstname ? reqFirstname : result.firstname

            lastnameRes  = reqLastname ? reqLastname : result.lastname

            usernameRes  = reqUsername ? reqUsername : result.username

            passwordRes  = reqPassword ? createHash(reqPassword) : result.password

            hashRes      = reqHash ? createHash(reqEmail + reqPassword) : result.hash
        }

    } catch (error) {
        return res.status(400).json({
            message: 'Erro na atualização de dados!!!'
        })

    }

    try {
        await prisma.$connect()
        await prisma.user.update({
            where: { id: reqIdUser },
            data: {
                firstname: firstnameRes,
                lastname: lastnameRes,
                username: usernameRes,
                email:  emailRes,
                password: passwordRes,
                hash: hashRes,
            }
        })

        // Status 200 como resposta para uma requisição de cadastro
        return res.status(200).json({
            message: 'Dados atualizados!',
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erro na atualização de dados!'
        })
    }

}


// Criando a função para Encriptar os dados
function createHash(data: string) {
    try {
        let hash = bcrypt.hash(data, 12)
        return hash
    } catch (error) {
        return false
    }

}

export default { getAllUsers, getUserById, addUser, updateUser }