import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export type UserType = {
    fullName: string
    role: string
    email: string
    password: string
}

export const User = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        fullName: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        role: {type: GraphQLString},
    })
})

export const userInput = new GraphQLInputObjectType({
    name: "UserInput",
    description: "User Create Type",
    fields: {
        fullName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "full name"
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        role: {
            type: GraphQLString
        }
    }
})
