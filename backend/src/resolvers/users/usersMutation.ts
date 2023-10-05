import prisma from "../../database/configDB"

export const usersMutation = {
    addUser: async (_: any, {input}: any) => {
        console.log('input', input)
        
        const res = await prisma.users.create({
            data: input
        })
        
        return res
    }
}