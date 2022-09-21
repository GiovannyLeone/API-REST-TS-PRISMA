import { Request, Response, NextFunction } from 'express'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: "Obter os dados dos usuários"
    })
}

export default { getAllUsers }