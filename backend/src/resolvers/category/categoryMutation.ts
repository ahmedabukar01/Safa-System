import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { adminOnly, auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";
import { Prisma } from "@prisma/client";

export const categoryMutation = {
    createCategory: async (_:any, {input}: any, {__, ___, user}: any) => {
    
        auth(user);
        adminOnly(user)

        try {
            
        const data = await prisma.category.create({
            data: {
                ...input,
                createdBy: user.id
            }
        })

        return data

        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new GraphQLError("Unique Constraint violation, Product name or Product ID already Existed!",{
                        extensions: {code: error.code, stack: error.stack},
                    } )
                }
            }
        }

    },
    updateCategory: async (_:any, {input}: any, {__, ___, user}: any) => {
        auth(user);
        adminOnly(user)

        const {id, data} = input;
        const yours = getYourData(user)

        try {
            const updatedCategory = await prisma.category.update({
                where: {
                    id: id,
                    createdBy: yours
                },
                data: {
                    ...data
                }
            })

            return updatedCategory

        } catch (error) {
            throw new GraphQLError("Something went wrong! Category din't found")
        }


    },
    deleteCategory: async (_:any, {id}: any, {__, ___, user}: any) => {

        console.log('user del', user)
        auth(user);
        adminOnly(user);

        const yours = getYourData(user)

        try {
            const deleted = await prisma.category.delete({
                where: {
                    id,
                    createdBy: yours,
                }
            })
    
            console.log('deleted', deleted);
    
            return {
                success: "Category Successfuly Deleted !!!"
            }
            
        } catch (error) {
            throw new GraphQLError("Something Went Wrong! Category Didn't Found!")
        }

    }
}