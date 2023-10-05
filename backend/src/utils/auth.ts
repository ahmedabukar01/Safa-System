import { GraphQLError } from "graphql"

export const auth = (user: any) => {
    
    if(!user) throw new GraphQLError("User is not Authenticated", {
        extensions: {
            code: 'UNAUTHETICATED',
            http: {status: 401}
        }
    })

}

export const adminOnly = (user: any) => {
    if(user.role !== 'Admin') throw new GraphQLError("You'va no access to this", {
        extensions: {
            code: 'UNAUTHORIZED',
            http: {status: 401}
        }
    })
}