import prisma from "../../database/configDB";
import { auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";

export const categoryQuery = {
    categories: async (_:any, {}, {__, ___, user}: any) => {
        console.log('the user ',user)
        auth(user);

        const yourData = getYourData(user);

        console.log('yur', yourData)
        const data = await prisma.category.findMany({where: {
            createdBy: yourData
        }})

        return data
    }, 
    category: async (_:any, {input}: any, {__, ___, user}: any) => {
        auth(user)

        const { id } = input

        const category = await prisma.category.findUnique({where: {
            id: id,
            createdBy: user.id
        }})

        return category;
    }
}