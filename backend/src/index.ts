import express, {Request, Response } from "express";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQuery } from "./users/query";
import { ApolloServer } from "apollo-server-express";
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

const Query = new GraphQLObjectType({
    name: "Query",
    description: "teh base Query",
    fields: {
        // user: {
        //     type: UserQuery,
        //     description: UserQuery.description,
        //     resolve: ()=> {return {}}
        // }
        users: {
            type: UserQuery
        }
    }
})

const schema = new GraphQLSchema({
    query: Query
})

const apolloServer = async () => {
    const server = new ApolloServer({
        schema
    })
    
    await server.start();
    server.applyMiddleware({app, path: "/graphql"});
}

apolloServer()

app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`)
    console.log(`Apoll Server is Running ${PORT}/graphql`)
})
