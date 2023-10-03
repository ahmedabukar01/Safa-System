import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { resolve } from "path";
import fs from 'fs'
import prisma from "./database/configDB";
import { usersQuery } from "./resolvers/users/usersQuery";
import { usersMutation } from "./resolvers/users/usersMutation";

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb',extended: false}))

const typeDefs = gql`
${fs.readFileSync(require.resolve('./schema.graphql'), 'utf-8')}
`;

const resolvers = {
    Query: {
        ...usersQuery
    },
    Mutation: {
        ...usersMutation
    }
}
const server = new ApolloServer({resolvers, typeDefs});

const startServer = async () => {
await server.start()
await server.applyMiddleware({ app})

}

startServer()


app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`)
    console.log(`Apoll Server is Running ${PORT}/graphql`)
})
