import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQuery } from "./users/query";
import { ApolloServer, gql } from "apollo-server-express";
import { UserMutation } from "./users/mutation";
import { resolve } from "path";
import fs from 'fs'
import prisma from "./database/configDB";

dotenv.config()

// const express = require("express")

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb',extended: false}))

// const Query = new GraphQLObjectType({
//     name: "Query",
//     description: "teh base Query",
//     fields: {
//         user: {
//             type: UserQuery,
//             description: UserQuery.description,
//             resolve: ()=> {return {}}
//         }
//     }
// })

// const Query = new GraphQLObjectType({
//     name: "Query",
//     description: "teh base Query",
//     fields: {
//         users: {
//             type: UserQuery,
//             resolve: () => {return {}}
//         }
//     }
// })

// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     description: "teh base Mutation",
//     fields: {
//         users: {
//             type: UserMutation,
//             resolve: () => {return {}}
//         }
//     }
// })

// const schema = new GraphQLSchema({
//     query: Query,
//     mutation: Mutation
// })

// const apolloServer = async () => {
//     const server = new ApolloServer({
//         schema
//     })
    
//     await server.start();
//     server.applyMiddleware({app, path: "/graphql"});
// }

// apolloServer()

// second chance

type userinput = {
    fullName: string
    email: string
    password: string
    role: string
    access: boolean
  }

const typeDefs = gql`
${fs.readFileSync(require.resolve('./schema.graphql'), 'utf-8')}
`;

const resolvers = {
    Query: {
        users: (_parent: any, input: any) => {
            return prisma.users.findMany();
        }
    },
    Mutation: {
        addUser: async (_: any, {input}: any) => {
            console.log('input', input)
            
            const res = await prisma.users.create({
                data: input
            })
            
            return res
        }
    }
}
const server = new ApolloServer({resolvers, typeDefs});

const serversFunc = async () => {
await server.start()
await server.applyMiddleware({ app})

}

serversFunc()


app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`)
    console.log(`Apoll Server is Running ${PORT}/graphql`)
})
