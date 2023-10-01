import { GraphQLFieldConfig, GraphQLObjectType } from "graphql";
import { User, UserType, userInput } from "./type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser: GraphQLFieldConfig<any, any, any> = {
    type: User,
    description: User.description,
    args: {
        input: {
            type: userInput,
            description: userInput.description
        }
    },
    resolve: async (parent,args) => {
        const input = args.input
        // console.log(input, 'input')

        const res = await prisma.users.create({
            data: {
                ...input
            }
        })

        // console.log('the result: ', res);

        return res
    }
}


export const UserMutation = new GraphQLObjectType({
    name: "UserMutation",
    description: "the user base Mutation",
    fields: {
        create: createUser
    }
})

export const registerUser = {

}