import express, {Request, Response } from "express";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQuery } from "./users/query";
import { ApolloServer, gql } from "apollo-server-express";
import { UserMutation } from "./users/mutation";
import { resolve } from "path";
dotenv.config()

// const express = require("express")

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8000

app.use(express.json());

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

const typeDefs = gql`
 type User {
    id: ID!
    fullName: StringQ!
    role: String!
    email: String!
    password: String!
 }

  type Query {
    users: [User!]!
  }
`;

const resolvers = {
    Query: {
        users: (parent: any, args: any) => {
            return prisma.users.findMany();
        }
    }
}

const server = new ApolloServer({resolvers, typeDefs});
server.start()

app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`)
    console.log(`Apoll Server is Running ${PORT}/graphql`)
})
