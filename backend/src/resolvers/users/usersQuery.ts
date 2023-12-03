import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { uniqueId } from "../types";
import { auth, superAdmin } from "../../utils/auth";

export const usersQuery = {
    users: async (_:any, {}:any, {___,__,user}: any ) => { // use one or two underscores in one position. escape the doublicate arguments.

        console.log('user', user)

        auth(user)
        superAdmin(user)

        const allClients = await prisma.users.findMany();
        console.log('cleints', allClients);

        return allClients;
    },
    adminsOnly: (_:any, {}:any, {___,__,user}: any ) => { // use one or two underscores in one position. escape the doublicate arguments.

        console.log('user', user)

        auth(user)
        superAdmin(user)

        return prisma.users.findMany({where: {role: "ADMIN"}});
    },

    me: async (_:any,__:any, {req, res, user} : any) => {
        auth(user);
        const {id} = user;
        const SingleUser = await prisma.users.findUnique({where: {id}})

        return SingleUser;
    },
    clearAll: async ()=> {
        await prisma.users.deleteMany()
        await prisma.category.deleteMany()
        return {success: "All Users Deleted Successfully"}
    }
}

