import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza' }),
    tagTypes: ['Order'],
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => 'history',
            providesTags: ['Order'] 
        }),
        createOrder: build.mutation({
            query: (formData) => ({
                url: 'order', 
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Order']
        }),
    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation
} = pizzaApi;
