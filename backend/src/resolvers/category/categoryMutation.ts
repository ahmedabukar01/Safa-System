import { GraphQLError } from "graphql";
import prisma from "../../database/configDB";
import { adminOnly, auth } from "../../utils/auth"
import { getYourData } from "../../utils/getYourData";

export const categoryMutation = {
    createCategory: async (_:any, {input}: any, {__, ___, user}: any) => {
    
        console.log('the user ',user)
        auth(user);
        adminOnly(user)

        const data = await prisma.category.create({
            data: {
                ...input,
                createdBy: user.id
            }
        })

        return data
    },
    updateCategory: async (_:any, {input}: any, {__, ___, user}: any) => {
        console.log('user', user)
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