import express , {request, response} from "express";
import prisma from "../../database/configDB";
import bcrypt from "bcryptjs"
import generateToken from "../../utils/generateTokens";
import jwt from 'jsonwebtoken'
import { createTokens } from "../../utils/CreateJwtToken";

export const authMutation = {
    register: async (_: any, {input}: any, {req, res}: any) => {
        const {password, email, ...rest} = input

        const userExists = await prisma.users.findUnique({where: {email}});
        if(userExists) throw new Error("User Already Exist!!!!")

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)

        const user = await prisma.users.create({data: {
            ...rest,
            email,
            password: hashed
        }})

        // generateToken(response, user.id)

        
        const token = createTokens(user.id);
        
        await res.cookie.set('id', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })


        return {
            token,
            id: user.id,
            fullNmae: user.fullName,
            role: user.role,
            access: user.access
        };

    },
    signIn: async (_:any, {input}: any, {req, res}: any) =>{
        const {email, password} = input;

        const user = await prisma.users.findUnique({where: {email}})

        if(user && (await bcrypt.compare(password, user.password))){
            
            const token = await createTokens(user.id)

            res.cookie('id', token, {
                httpOnly: true,
                secure: true,
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                sameSite: "none",
        
            })

            return {
                token,
                id: user.id,
                fullNmae: user.fullName,
                role: user.role,
                access: user.access
            }
        } else {
            throw new Error("invalid Credentials")
        }
    }
}