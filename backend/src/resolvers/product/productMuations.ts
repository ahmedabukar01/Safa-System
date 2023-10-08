import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { adminOnly, auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";

export const productMutaion = {
    createProduct: async (_:any, {input}: any, {__, ___, user}: any) => {
    
        console.log('the user ',user)
        console.log('the input', input)

        auth(user);
        adminOnly(user)

        const {categoryId, ...rest} = input

        const data = await prisma.products.create({
            data: {
                ...rest,
                createdBy: user.id,
                categoryId: categoryId
            },
            include: {
                category: true
            }
        }
        )

        console.log('data', data)

        return data
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