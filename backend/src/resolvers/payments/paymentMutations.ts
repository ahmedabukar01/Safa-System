import prisma from "../../database/configDB";
import { auth } from "../../utils/auth";
import { getYourData } from "../../utils/getYourData";

export const paymentMutations = {
    createPayment: async (_: any, {input}: any, {__, ___, user}: any) => {
        console.log('input payment', input);
        auth(user);

        const {total} = input;
        const sharedId = getYourData(user);

        try {
            const res = await prisma.payments.create({
                data: {
                    total,
                    createdBy: sharedId,
                    items: {
                        createMany: {data: input.items}
                    }
                }
            });

            return res;
        } catch (error) {
            console.error(error)
        }
    }
}