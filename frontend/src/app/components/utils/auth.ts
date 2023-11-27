import { Admins } from "@/app/graphql"
import { useSuspenseQuery } from "@apollo/client"

export const GET_USERS = () => {
    const {data, error} = useSuspenseQuery(Admins, {
        fetchPolicy: "no-cache"
      })

      const result = data.adminsOnly.map((ctg: any) => {
        return {
            label: ctg.fullName,
            value: ctg.id
        }
    })

      return result;
}