import { useParams } from "react-router-dom"
import Grid from "@mui/material/Grid";
import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";


export default function ProductDetails() {
  const {id} = useParams();
  const {data : product,isLoading} = useFetchProductDetailQuery(id ? +id : 0);
  const {data:basket} = useFetchBasketQuery();
  const [addBasketItem] = useAddBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity,setQuantity] = useState(0);

  useEffect(() => {
    if(item) setQuantity(item.quantity);
  }, [item])

  if( isLoading || !product) return <div>Loading...</div>

  // cộng trừ số lượng sản phẩm muốn thêm với số lượng sản phẩm có trong giỏ hàng
  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity 
    if(!item || quantity > item.quantity){
      addBasketItem({product,quantity: updatedQuantity})
    }else{
      removeBasketItem({productId: product.id, quantity: updatedQuantity })
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if(value >= 0) setQuantity(value) 
  }

  const productDetails =[
      {label:'Name',value: product.name},
      {label:'Description',value: product.description},
      {label:'Type',value: product.type},
      {label:'Brand',value: product.brand},
      {label:'Quanity in stock',value: product.quantityInStock}
  ]

  return (
    <Grid container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
      <Grid size={6}>
        <img src={product?.pictureUrl} alt={product.name} style={{width:'100%'}}/>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color="primary"></Typography>
        <TableContainer>
          <Table sx={{
            '& td':{fontSize:'1rem'}
          }}>
            <TableBody>
              {productDetails.map((detail,index)=> (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight:'bold'}}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <TextField 
            variant="outlined"
            type="number"
            label='Quanity in basket'
            value={quantity}
            onChange={handleInputChange}
          />
          <Grid size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={quantity === item?.quantity || !item && quantity === 0}
              sx={{height:'55px'}}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update quantity" : "Add to basket"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}