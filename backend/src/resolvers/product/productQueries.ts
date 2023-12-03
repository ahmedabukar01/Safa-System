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
        },
        include: {
            category: true
        }
    })

        return data
    }, 
    product: async (_:any, {id}: any, {__, ___, user}: any) => {
        auth(user)

        const yours = getYourData(user);
        try {
            const product = await prisma.products.findUnique({where: {
                // combined unique fields, see in our schema
               Proudct_id_identifier: {
                productID: id,
                createdBy: yours
               }
            },
            include: {
                category: true
            }
        })
    
            return product;
        } catch (error) {
            console.log("Error",error)
        }
    }
}