import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants'

//Recall, inject adds it to the builder in "apiSlice.js" main file
export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            })
        })
    })
})

export const { useCreateOrderMutation } = ordersApiSlice;