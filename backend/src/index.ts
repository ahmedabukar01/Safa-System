import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { GraphQLError, GraphQLObjectType, GraphQLSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { resolve } from "path";
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import fs from 'fs'
import prisma from "./database/configDB";
import { usersQuery } from "./resolvers/users/usersQuery";
import { usersMutation } from "./resolvers/users/usersMutation";
import { authMutation } from "./resolvers/auth/authMutation";
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import expressSession from 'express-session'
import { categoryMutation } from "./resolvers/category/categoryMutation";
import { categoryQuery } from "./resolvers/category/categoryQuery";
import { productQueries } from "./resolvers/product/productQueries";
import { productMutaion } from "./resolvers/product/productMuations";
import { ALLOWED_HOSTS } from "./config";
import { authQuery } from "./resolvers/auth/authQuery";
import { paymentMutations } from "./resolvers/payments/paymentMutations";
import { paymentQueries } from "./resolvers/payments/paymentQuery";

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
        ...usersQuery,
        ...categoryQuery,
        ...productQueries,
        ...paymentQueries
        // ...authQuery
    },
    Mutation: {
        ...usersMutation,
        ...authMutation,
        ...categoryMutation,
        ...productMutaion,
        ...paymentMutations
    }
}

app.use(cookieParser())

const corsOptions = {
    origin: ALLOWED_HOSTS,
    credentials: true
}

const server = new ApolloServer({
    resolvers, 
    typeDefs,
    csrfPrevention: true,
    introspection: false,
    cache: new InMemoryLRUCache({
        maxSize: 1024, // limit the cache size to 1024 MB
    }),
    context: async ({req, res}) => { 

        // be care full in these auth, //@ you should improve it and test it.
        

        // cookies token
        let token = null;

        if(req.headers.cookie){
            try {
                const id = req?.headers.cookie;
                token = id.substring(3) 

                if(!token) return {req, res};  // i did this just to prevent the server to crash out. or not to stop. cuz if i use throw new error or graphqlError the server won't work and throws error because it's in the context.

                const decoded: any = jwt.verify(token, process.env.WHOAREYOU!);

                // if(!decoded) return new GraphQLError("invalid jsonwebtoken");

                const user = await prisma.users.findUnique({
                    where: {id: decoded.id},
                    select: {
                        access: true,
                        id: true,
                        role: true,
                        email: true,
                        fullName: true,
                        adminBy: true,
                    }
                })

                return {req, res, user}

            } catch (error) {
                console.error('Error',error);
                // res.json({error: "unathorized user or InValid Token / Signature"})
                throw new GraphQLError('unathorized user')
            }
        }

        if(!token){
            // res.status(401);
            // throw new Error('no authorized no token!')
        }

        return {req, res}
    }


        // headers Token

//         let token = ''
//         if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//             try {
//                 token = req?.headers?.authorization?.split(' ')[1];

//                 if(!token?.length) return {req, res};  // i did this just to prevent the server to crash out. or not to stop. cuz if i use throw new error or graphqlError the server won't work and throws error because it's in the context.

//                 const decoded: any = jwt.verify(token, process.env.WHOAREYOU!);

//                 // if(!decoded) return new GraphQLError("invalid jsonwebtoken");

//                 const user = await prisma.users.findUnique({
//                     where: {id: decoded.id},
//                     select: {
//                         access: true,
//                         id: true,
//                         role: true,
//                         email: true,
//                         fullName: true,
//                         adminBy: true,
//                     }
//                 })

//                 return {req, res, user}

//             } catch (error) {
//                 console.error('Error',error);
//                 // res.json({error: "unathorized user or InValid Token / Signature"})
//                 throw new GraphQLError('unathorized user')
//             }
//         }

//         if(!token){
//             // res.status(401);
//             // throw new Error('no authorized no token!')
//         }

//         console.log('tokenserver', token)
//         return {req, res}
//     }

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
await server.applyMiddleware({ 
    app,
    cors: corsOptions
})

}

startServer()


app.listen(PORT, () => {
    console.log(` 🚀 🚀 🚀 Server is Running ${PORT}`)
    console.log(`🚀 🚀 🚀 Apoll Server is Running ${PORT}/graphql`)
})
