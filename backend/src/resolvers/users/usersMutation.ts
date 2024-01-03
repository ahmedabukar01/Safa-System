import prisma from "../../database/configDB"
import { adminOnly, auth, superAdmin } from "../../utils/auth";
import bcrypt from 'bcryptjs'

export const usersMutation = {
    addUser: async (_: any, {input}: any, {__,___, user}: any) => {
        console.log(input);

        auth(user);
        superAdmin(user)

        const {adminBy, data} = input
        const {email, password, ...rest} = data;

        const userExists = await prisma.users.findUnique({where: {email}});
        if(userExists) throw new Error("User Already Exist!!!!")

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        
        const res = await prisma.users.create({
            data: {
                ...rest,
                email,
                password: hashed,
                adminBy
            }
        })
        
        return res
    },
    updateBrandName: async (_: any, {input}: any, {__,___, user}: any) => {
        auth(user);
        adminOnly(user);

        const userId = user?.id 
        const {brandName} = input;

        try {
            await prisma.users.update({
                where: {id: userId},
                data: {
                    brandName: brandName
                }
            })

            return {
                success: "Brand Name Succefuly updated"
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    }
}