import { Request, Response } from "express"
import { GraphQLError } from "graphql";
import jwt from 'jsonwebtoken'
import { createTokens } from "../../utils/CreateJwtToken";

export const authQuery = {
    // refreshToken: async (_:any, {}, {req,res, user}: {req: Request, res: Response, user:any} ) => {

    //     // const refreshToken = req.cookies.id;

    //     // const decoded = await jwt.verify(refreshToken, process.env.WHOAREYOU!);

    //     // if(!decoded) throw new GraphQLError("Access Denied, no Refreshtoken", {
    //     //     extensions: {
    //     //         code: 'UNAUTHETICATED',
    //     //         http: {status: 401}
    //     //     }
    //     // })

    //     // const token = createTokens(user.id)


    // }
}