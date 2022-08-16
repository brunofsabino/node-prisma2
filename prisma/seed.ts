import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.user.deleteMany({})
    await prisma.post.deleteMany({})

    const user = await prisma.user.create({
        data: {
            name: "Bruno",
            email: "bruno@seed.com",
            age: 32,
        }
    })

    const posts = await prisma.post.create({
        data: {
            title: "Titulo de teste",
            published: true,
            body: "Este é o conteúdo do corpo do post",
            authorId: user.id
        }
    })
}

main()