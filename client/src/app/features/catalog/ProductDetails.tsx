import { useParams } from "react-router-dom"
import Grid from "@mui/material/Grid";
import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailQuery } from "./catalogApi";


export default function ProductDetails() {
  const {id} = useParams();
  const {data : product,isLoading} = useFetchProductDetailQuery(id ? +id : 0);

  if( isLoading || !product) return <div>Loading...</div>

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
          />
          <Grid size={6}>
            <Button
              sx={{height:'55px'}}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}