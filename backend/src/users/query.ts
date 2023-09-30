import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType } from "graphql";
import { User } from "./type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Users: GraphQLFieldConfig<any, any, any> = {
    type: new GraphQLList(User),
    description: User.description,
    resolve: (parent) => {
        return prisma.users.findMany
    }
}


export const UserQuery = new GraphQLObjectType({
    name: "UserQuery",
    description: "the user Query",
    fields: {
        Users
    }
})