import prisma from "../../database/configDB";
import { uniqueId } from "../types";

export const usersQuery = {
    users: () => {
        return prisma.users.findMany();
    },
    user: async (_:any,{id}: uniqueId) => {
        console.log('id', id)
        const res = await prisma.users.findUnique({where: {id}})

        if(!res) {
            return {res: "User Doesn't Exist"}
        }

        return res;
    }
}

