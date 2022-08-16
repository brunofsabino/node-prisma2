import { Request, Response } from "express";
import { PostService } from "../services/PostService"
import { UserService } from "../services/UserService";

export const all = async (req: Request, res: Response) => {
    const users = await UserService.findAll()
    if(users) {
        res.json({users})
    } else {
        res.json({ error: 'Usuários não localizados'})
    }
}
export const one = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await UserService.findOne(id)
    if(user) {
        res.json({user})
    }else {
        res.json({ error: 'Usuário não localizado'})
    }
}
export const create = async (req: Request, res: Response) => {
    const { name, email, age } = req.body
    if(name && email) {
        const newUser = await UserService.create({
            name, email, age: parseInt(age) ?? 0
        })
        if(newUser) {
            res.json({user: newUser})
        } else {
            res.json({error: 'Tente mais tarde'})
        }
    } else {
        res.json({error: 'Campos não preenchidos'})
    }
}
export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, age } = req.body
    if(name || age) {
        const user = await UserService.findOne(id)
        if(user) {
            const userUpdate = await UserService.update(id, {
                name,
                age: parseInt(age) ? parseInt(age) : user.age!
            })
            if(userUpdate) {
                res.json({user: userUpdate})
            } else {
                res.json({error: 'Usuário não atualizado'})
            }
        } else {
            res.json({error: 'Usuário não localizado'})
        }
    } else {
        res.json({error: 'campos não preenchidos'})
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await UserService.findOne(id)
    if(user) {
        await UserService.delete(user.id)
        res.json({success: true})
    } else {
        res.json({error: 'Usuário não localizado'})
    }
}