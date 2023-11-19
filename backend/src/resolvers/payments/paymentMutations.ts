import prisma from "../../database/configDB";
import { auth } from "../../utils/auth";

export const paymentMutations = {
    createPayment: async (_: any, {input}: any, {__, ___, user}: any) => {
        console.log('input payment', input);
        auth(user);

        const {total} = input;

        try {
            const res = await prisma.payments.create({
                data: {
                    total,
                    createdBy: user.id,
                    items: {
                        createMany: {data: input.items}
                    }
                }
            });

            console.log('res', res);

            return res;
        } catch (error) {
            console.error(error)
        }
    }
}