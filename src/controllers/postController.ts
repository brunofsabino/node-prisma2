import { Request, Response } from "express";
import { PostService } from "../services/PostService"
import { UserService } from "../services/UserService";

export const all = async (req: Request, res: Response) => {
    const posts = await PostService.findAll()
    res.json({posts})
}
export const one = async(req: Request, res: Response) => {
    const { id } = req.params
    const post = await PostService.findOne(id)
    if(post){
        res.json({post})
    } else {
        res.json({error: 'Post não localizado'})
    }
}
export const create = async (req: Request, res: Response) => {
    const { title, author, body } = req.body
    if(title && author && body) {
        const user = await UserService.findOne(author)
        if(user) {
            const newPost = await PostService.create({
                title, body, authorId: user.id
            })
            if(newPost) {
                res.json({post: newPost})
            } else {
                res.json({error: "Erro na criação do post"})
            }
        } else {
            res.json({error: 'Erro nos dados'})
        }
    } else {
        res.json({error: 'Dados não localizado'})
    }
}
export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body, title, published } = req.body
    if(id) {
        const post = await PostService.findOne(id)
        if(post) {
           const postUpdate = await PostService.update(post.id, {
            authorId: post.id,
            body: body ?? undefined,
            title: title ?? undefined,
            published: !post.published
           })
           if(postUpdate) {
                res.json({ post: postUpdate})
           } else {
                res.json({ error: "Problema ao atualizar post"})
           }
        } else {
            res.json({error: 'Erro nos dados'})
        }
    } else {
        res.json({error: 'Dados não localizado'})
    }
}
export const deletePost = async(req: Request, res: Response) => {
    const { id } = req.params
    const post = await PostService.findOne(id)
    if(post) {
        await PostService.delete(post.id)
        res.json({success: true})
    } else {
        res.json({error: 'Post não localizado'})
    }
}