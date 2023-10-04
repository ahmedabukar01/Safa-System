import prisma from "../../database/configDB";
import { uniqueId } from "../types";

export const usersQuery = {
    users: () => {
        return prisma.users.findMany();
    },
    user: async (_:any,{id}: uniqueId) => {
        const res = await prisma.users.findUnique({where: {id}})

        if(!res) throw new Error("User Doesn't Exists!")

        return res;
    },
    clearAll: async ()=> {
        const res = await prisma.users.deleteMany()
        return {success: "All Users Deleted Successfully"}
    }
}

