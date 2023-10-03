import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
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

const findUser: GraphQLFieldConfig<any, any, any> = {
    type: new GraphQLList(User),
    description: User.description,
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parent,args) => {
        return prisma.users.findUnique(args.id)
    }
}


export const UserQuery = new GraphQLObjectType({
    name: "UserQuery",
    description: "the user Query",
    fields: {
        Users,
        findUser
    }
})