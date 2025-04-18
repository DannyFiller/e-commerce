import {  decreament, increament } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/Store";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h2">
        Contact Page
      </Typography>
      <Typography variant="body1">
        The data is : {data}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(decreament(1))} color="error">Decreament</Button>
        <Button onClick={() => dispatch(increament(1))} color="secondary">Increament</Button>
        <Button onClick={() => dispatch(increament(5))} color="primary">Increament 5</Button>
      </ButtonGroup>
    </>
  )
}