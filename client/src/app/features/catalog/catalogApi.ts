import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../models/product";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

export const catalogApi = createApi({
    reducerPath:'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[],void>({
            query: () => ({url: 'products'})
        }),
        fetchProductDetail: builder.query<Product,number>({
            query: (productId) => `products/${productId}`
        })
    })
})

export const {useFetchProductDetailQuery, useFetchProductsQuery} = catalogApi;