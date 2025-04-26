import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundError() {
  return (
    <Paper
        sx={{
            height:400,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            p:6
        }}
    >

        <SearchOff sx={{fontSize:100}} color="secondary"></SearchOff>
        <Typography gutterBottom variant="h3">
            Opps - we cound not find what you were lookong for 
        </Typography>
        <Button fullWidth component={Link} to=''>Go back to shop</Button>

    </Paper>
  )
}