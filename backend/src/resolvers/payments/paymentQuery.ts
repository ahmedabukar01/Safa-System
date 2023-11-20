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

    console.log('all', res)
    return res
   }
}