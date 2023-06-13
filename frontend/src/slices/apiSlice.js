import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = '/'

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Todo'],
    endpoints: (builder) => ({})
})