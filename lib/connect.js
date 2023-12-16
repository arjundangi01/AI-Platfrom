import { prismadb } from "@/prisma/prismadb"

export const connect = async () => {
    try {
        await prismadb.$connect()
    } catch (error) {
        console.log(error)
        throw new Error('unable to connect');
    }
}