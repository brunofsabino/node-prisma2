import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type PropDataCreate = {
    title: string,
    body: string,
    authorId: string,
    published?: boolean
}
type PropDataUpdate = {
    title?: string,
    body?: string,
    authorId: string,
    published?: boolean
}

export const PostService = {
    findAll: async() => {
        return await prisma.post.findMany({})
    },
    findOne: async(id: string) => {
        return await prisma.post.findUnique({ where: { id }})
    },
    create: async(data: PropDataCreate) => {
        return await prisma.post.create({
            data
        })
    },
    update: async(id: string, data: PropDataUpdate) => {
        return await prisma.post.update({ 
            where: { id },
            data: { 
                title: data.title,
                body: data.body,
                published: data.published 
            }
        })
    },
    delete: async(id: string) => {
        return await prisma.post.delete({ where: { id }})
    }
}

