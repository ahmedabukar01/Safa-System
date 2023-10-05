import prisma from "../../database/configDB";
import { uniqueId } from "../types";

export const usersQuery = {
    users: (_:any, {}:any, {___,__,user}: any ) => { // use one or two underscores in one position. escape the doublicate arguments.

        console.log('user', user)
        return prisma.users.findMany();
    },
    user: async (_:any,{id}: uniqueId, {req, res, user} : any) => {
        const SingleUser = await prisma.users.findUnique({where: {id}})

        if(!SingleUser) throw new Error("User Doesn't Exists!")

        return SingleUser;
    },
    clearAll: async ()=> {
        const res = await prisma.users.deleteMany()
        return {success: "All Users Deleted Successfully"}
    }
}

