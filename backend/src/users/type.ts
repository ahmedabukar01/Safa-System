import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        fullName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        adminBy: {type: GraphQLString},
    })
})