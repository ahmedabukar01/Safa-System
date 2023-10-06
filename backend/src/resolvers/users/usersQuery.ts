import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { uniqueId } from "../types";
import { auth, superAdmin } from "../../utils/auth";

export const usersQuery = {
    users: (_:any, {}:any, {___,__,user}: any ) => { // use one or two underscores in one position. escape the doublicate arguments.

        console.log('user', user)

        auth(user)
        superAdmin(user)

        return prisma.users.findMany();
    },

    user: async (_:any,{id}: uniqueId, {req, res, user} : any) => {
        const SingleUser = await prisma.users.findUnique({where: {id}})

        if(!SingleUser) throw new Error("User Doesn't Exists!")

        return SingleUser;
    },
    clearAll: async ()=> {
        await prisma.users.deleteMany()
        await prisma.category.deleteMany()
        return {success: "All Users Deleted Successfully"}
    }
}

