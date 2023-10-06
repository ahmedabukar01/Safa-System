import prisma from "../../database/configDB";
import { adminOnly, auth } from "../../utils/auth"

export const categoryMutation = {
    createCategory: async (_:any, {input}: any, {__, ___, user}: any) => {
    
        console.log('the user ',user)
        auth(user);
        adminOnly(user)

        console.log('so here ?/')

        const data = await prisma.category.create({
            data: {
                ...input,
                createdBy: user.id
            }
        })

        console.log('data', data)

        return data
    }
}