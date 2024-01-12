import prisma from "../../database/configDB"
import { adminOnly, auth, superAdmin } from "../../utils/auth";
import bcrypt from 'bcryptjs'
import { getYourData } from "../../utils/getYourData";

export const DashboardQueries = {
    dashCount: async (_: any, {input}: any, {__,___, user}: any) => {
        auth(user);
        // adminOnly(user);

        const yourId = getYourData(user);

        const categories = await prisma.category.findMany({
            where: {
                createdBy: yourId
            }
        });
        const products = await prisma.products.findMany({
            where: {
                createdBy: yourId
            }
        });
        const users = await prisma.users.findMany({
            where: {
                adminBy: yourId
            }
        });
        const payments = await prisma.payments.findMany({
            where: {
                createdBy: yourId
            }
        });

        

        const numOfCategoreis = categories.length;
        const numOfProducts = products.length;
        const numOfUsers = users.length;
        const numOfPayments = payments.length;

        return {
            numOfCategoreis,
            numOfPayments,
            numOfProducts,
            numOfUsers
        }
    },
    paymentsReport: async (_: any, {}: any, {__,___, user}: any) => {
        auth(user);
        const yourId = getYourData(user);

        try {
            const payments = await prisma.payments.findMany({
                where: {createdBy: yourId},
                include: {
                    items: true
                }
            }
            )
            return payments
        } catch (error) {
            console.error("ERror: ", error)
        }
    }
}