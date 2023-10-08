import prisma from "../../database/configDB";
import { auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";

export const productQueries = {
    products: async (_:any, {}, {__, ___, user}: any) => {
        console.log('the user ',user)
        auth(user);

        const yourData = getYourData(user);

        const data = await prisma.products.findMany({where: {
            createdBy: yourData
        }})

        return data
    }, 
    product: async (_:any, {id}: any, {__, ___, user}: any) => {
        auth(user)

        const yours = getYourData(user);

        const category = await prisma.products.findUnique({where: {
            id: id,
            createdBy: yours
        }})

        return category;
    }
}