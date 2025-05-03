import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import { Basket, Item } from "../../models/basket";
import { Product } from "../../models/product";

function isBasketItem(product: Product| Item) : product is Item{
    return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes:['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket,void>({
            query: () => 'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket, {product: Product | Item,quantity:number}>({
            query: ({product,quantity}) => {
                const productId = isBasketItem(product) ? product.productId : product.id;
                return{
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: 'POST'
                }
            },
            onQueryStarted: async ( {product, quantity} , {dispatch , queryFulfilled}) => {
                // nếu là false là đã có giỏ hàng ở cookies | true là chưa có giỏ hàng 
                let isNewBasket = false;
                const pathcResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket',undefined,(draft) =>{
                        const productId = isBasketItem(product) ? product.productId : product.id;

                        if(!draft?.basketId) isNewBasket = true;

                        // nếu như isNewBasket == false đã có giỏ hàng ở cookies
                        if(!isNewBasket){
                            const existingItem = draft.items.find(item => item.productId === productId);
                            if(existingItem) existingItem.quantity +=quantity;
                            else draft.items.push(isBasketItem(product) 
                            ? product: {...product,productId: product.id, quantity}); 
                        }
;                    })
                )
                try {
                    await queryFulfilled;
                    if(isNewBasket) dispatch(basketApi.util.invalidateTags(['Basket']))
                } catch (error) {
                    console.log(error);
                    pathcResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<Basket,{productId:number,quantity:number}>({
            query: ({productId,quantity}) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({productId,quantity}, {dispatch, queryFulfilled}) => {
                const pathResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket',undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId);
                        if(itemIndex >= 0){
                            // nếu giỏ hàng >= 0
                            draft.items[itemIndex].quantity -=quantity;
                            // nếu product trong giỏ hàng có số lượng <= 0
                            if(draft.items[itemIndex].quantity <= 0){
                                // xóa product khỏi giỏ hàng 
                                draft.items.splice(itemIndex,1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    pathResult.undo();
                }
            }
        })
    })
})

export const {useFetchBasketQuery,useAddBasketItemMutation, useRemoveBasketItemMutation } = basketApi;