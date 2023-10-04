import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { resolve } from "path";
import fs from 'fs'
import prisma from "./database/configDB";
import { usersQuery } from "./resolvers/users/usersQuery";
import { usersMutation } from "./resolvers/users/usersMutation";
import { authMutation } from "./resolvers/auth/authMutation";
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import expressSession from 'express-session'

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
        ...usersMutation,
        ...authMutation
    }
}

app.use(cookieParser())

const server = new ApolloServer({
    resolvers, 
    typeDefs,
    context: async ({req, res}) => { 
        
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                token = req.headers.authorization.split(' ')[1];

                const decoded: any = jwt.verify(token, process.env.WHOAREYOU!);

                const user = await prisma.users.findUnique({where: {id: decoded.id}})

                return {req, res, user}

            } catch (error) {
                console.error(error);
                res.status(401);
                throw new Error('unathorized user')
            }
        }

        if(!token){
            res.status(401);
            throw new Error('no authorized no token!')
        }

        // console.log('here the last line in context')

        return {req, res}
    }

});

// app.use(
//     expressSession({
//         name: "id",
//         secret: process.env.WHOAREYOU!,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60 * 24 * 7
//         }
//     })
// )

const startServer = async () => {
await server.start()
await server.applyMiddleware({ app})

}

startServer()


app.listen(PORT, () => {
    console.log(` 🚀 🚀 🚀 Server is Running ${PORT}`)
    console.log(`🚀 🚀 🚀 Apoll Server is Running ${PORT}/graphql`)
})
