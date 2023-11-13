import { GetCategory } from "@/app/graphql"
import { useSuspenseQuery } from "@apollo/client"

export const GetCategories = () => {
    const {data, error} = useSuspenseQuery(GetCategory, {
        fetchPolicy: "no-cache"
      })

      const result = data.categories.map((ctg: any) => {
        return {
            label: ctg.name,
            value: ctg.id
        }
    })

      return result;
}