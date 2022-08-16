import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type PropDataCreate = {
    name: string,
    email: string,
    age?: number
}
type PropDataUpdate = {
    name?: string,
    age?: number
}

export const UserService = {
    findAll: async() => {
        return await prisma.user.findMany({})
    },
    findOne: async(id: string) => {
        return await prisma.user.findUnique({ where: { id }})
    },
    create: async(data: PropDataCreate) => {
        return await prisma.user.create({ data })
    },
    update: async(id: string, data: PropDataUpdate) => {
        return await prisma.user.update({ where: { id }, data })
    }, 
    delete: async(id: string) => {
        return await prisma.user.delete({ where: { id }})
    }
}