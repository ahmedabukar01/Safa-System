import prisma from "../../database/configDB";
import { auth } from "../../utils/auth";
import { getYourData } from "../../utils/getYourData";

export const paymentQueries = {
   payments:  async (_:any, {}, {__, ___, user}: any) => {
    auth(user);

    const yourData = getYourData(user);
    
    const res = await prisma.payments.findMany({
        where: {
            createdBy: yourData,
        },
        include: {
            items: true
        }
    });

    return res
   },

   findPayment: async (_:any, {id}: any, {__, ___, user}: any) => {

    const yourData = getYourData(user);

    try {
        const res = await prisma.payments.findUnique({where: {
            createdBy: yourData,
            id
        }, 
        include: {
            items: true
        }
    });

        return res;

    } catch (error) {
        console.log("Error: ", error);
    }
   }

}