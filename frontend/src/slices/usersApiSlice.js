import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users"
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice