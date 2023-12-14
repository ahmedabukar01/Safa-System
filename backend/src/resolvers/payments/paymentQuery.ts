import prisma from "../../database/configDB";
import { auth } from "../../utils/auth";
import { getYourData } from "../../utils/getYourData";

export const paymentQueries = {
   payments:  async (_:any, {filters}: any, {__, ___, user}: any) => {
       
       auth(user);
       const {startDate, endDate} = filters;

    const yourData = getYourData(user);
    try {
        const res = await prisma.payments.findMany({
            orderBy:{
                createdAt: "desc"
            },
            where: {
                createdBy: yourData,
    
                // AND: [
                //     {createdAt: {lte: endDate ? endDate : undefined}},
                //     {createdAt: {gte: startDate ? startDate : undefined}}
                // ]
    
                createdAt: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate): undefined,
                    
                }
    
                // OR: [
                //     {createdAt: {lte: endDate ? endDate : undefined, gte: startDate? startDate : undefined}},
                //     {createdAt: {gte: startDate ? startDate : undefined, lte: endDate? endDate : undefined}}
                // ]
            },
            include: {
                items: true
            }
        });
    
        return res
        
    } catch (error) {
        console.error("error: ", error)
    }
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