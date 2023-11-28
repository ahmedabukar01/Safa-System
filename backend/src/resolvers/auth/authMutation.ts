import prisma from "../../database/configDB";
import bcrypt from "bcryptjs"
import generateToken from "../../utils/generateTokens";
import jwt from 'jsonwebtoken'
import { createTokens } from "../../utils/CreateJwtToken";
import {Request, Response} from 'express'

export const authMutation = {
    register: async (_: any, {input}: any, {req, res, user}: any) => {
        console.log("here in the server", input)
        const {password, email, ...rest} = input

        const userExists = await prisma.users.findUnique({where: {email}});
        if(userExists) throw new Error("User Already Exist!!!!")

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)

        const newUser = await prisma.users.create({data: {
            ...rest,
            email,
            password: hashed
        }})

        // generateToken(response, user.id)

        
        // const token = createTokens(user.id, user.role);
        
        // await res.cookie.set('id', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        // })


        return {
            id: newUser.id,
            fullNmae: newUser.fullName,
            role: newUser.role,
            access: newUser.access
        };

    },
    signIn: async (_:any, {input}: any, {req, res}: any) =>{
        const {email, password} = input;

        const user = await prisma.users.findUnique({where: {email}})

        if(user && (await bcrypt.compare(password, user.password))){
            
            const token = await createTokens(user.id,user.role)

            res.cookie('id', token, {
                httpOnly: true,
                secure: true,
                // secure: process.env.NODE_ENV === 'production',
                maxAge:  1000 * 60 * 60 * 24, // 1000 * 60 = one munite. // 1000 * 60 * 60 * 24 * 7 = 7 days 
                sameSite: "none",
        
            })

            // lastlogged
            const now = new Date();
            await prisma.users.update({data: {lastLogged: now}, where: {id: user.id}})

            return {
                token,
                id: user.id,
                fullName: user.fullName,
                role: user.role,
                access: user.access
            }

        } else {
            throw new Error("invalid Credentials")
        }
    },

    logout: async (_:any, {}, {req,res}: {req: Request, res: Response} ) => {

        res.cookie('id', '', {
             httpOnly: true,
             expires: new Date(0)
         });
 
         res.clearCookie("id");
         
        return {
            success: "woow"
        }
 
     },
}