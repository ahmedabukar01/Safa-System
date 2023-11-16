import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { adminOnly, auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";
import { Prisma } from "@prisma/client";

export const productMutaion = {
    createProduct: async (_:any, {input}: any, {__, ___, user}: any) => {

        auth(user);
        adminOnly(user)

        const {categoryId, ...rest} = input

        try {
            const data = await prisma.products.create({
                data: {
                    ...rest,
                    createdBy: user.id,
                    categoryId: categoryId
                },
                // include: {
                //     category: true
                // }
            }
            )
    
            console.log('data', data)

            return data
        } catch (error) {

            console.log("error: ", error)
            // this Prisma is not prisma (instance of prisma client).
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new GraphQLError("Unique Constraint violation, Product name or Product ID already Existed!",{
                        extensions: {code: error.code, stack: error.stack},
                    } )
                }
            }
        }
    },
    updateProduct: async (_:any, {input}: any, {__, ___, user}: any) => {
        console.log('user', user)
        auth(user);
        adminOnly(user)

        const {id, data} = input;
        const yours = getYourData(user)

        try {
            const updatedCategory = await prisma.products.update({
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
    deleteProduct: async (_:any, {id}: any, {__, ___, user}: any) => {

        console.log('user del', user)
        auth(user);
        adminOnly(user);

        const yours = getYourData(user)

        try {
            const deleted = await prisma.products.delete({
                where: {
                   Proudct_id_identifier: {
                    createdBy: yours,
                    productID: id
                   }
                }
            })
    
            return {
                success: "Product Successfuly Deleted !!!"
            }
            
        } catch (error) {
            throw new GraphQLError("Something Went Wrong! Product Didn't Found!")
        }

    }
}