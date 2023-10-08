import prisma from "../../database/configDB";
import { auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";

export const categoryQuery = {
    categories: async (_:any, {}, {__, ___, user}: any) => {
        console.log('the user ',user)
        auth(user);

        const yourData = getYourData(user);

        const data = await prisma.category.findMany({where: {
            createdBy: yourData
        },
        include: {
            products: true
        }
    })

        return data
    }, 
    category: async (_:any, {id}: any, {__, ___, user}: any) => {
        auth(user)

        const yours = getYourData(user);

        const category = await prisma.category.findUnique({where: {
            id: id,
            createdBy: yours
        }})

        return category;
    }
}