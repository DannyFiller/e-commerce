import { Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"
import OrderSummary from "../../shared/components/OrderSummary";
import BasketItem from "./BasketItem";


export default function BasketPage() {
    const {data,isLoading} = useFetchBasketQuery();

    if (isLoading) return <Typography variant="h5">Loading Basket...</Typography>
    if (!data || data.items.length === 0) return <Typography variant="h5">Your basket empty</Typography>
    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                {data.items.map(item => (
                    <BasketItem item={item} key={item.productId}/>
                ))}
            </Grid>
            <Grid size={4}>
                <OrderSummary/>
            </Grid>
            
        </Grid>
    )
}