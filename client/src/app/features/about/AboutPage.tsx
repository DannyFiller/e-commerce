import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useLazyGet400errorQuery, useLazyGet401errorQuery, useLazyGet404errorQuery, useLazyGet500errorQuery, useLazyGetValidationErrorQuery } from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [Trigger400error] = useLazyGet400errorQuery();
  const [Trigger401error] = useLazyGet401errorQuery();
  const [Trigger404error] = useLazyGet404errorQuery();
  const [Trigger500error] = useLazyGet500errorQuery();
  const [TriggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await TriggerValidationError().unwrap();
    } catch (error : unknown) {
      if(error && typeof error === 'object' && 'message' in error && typeof (error as {message: unknown}).message === 'string'){
        const errorArray = (error as {message : string}).message.split(', ');
        setValidationErrors(errorArray);
      }
    }
  }

  return (
    <Container maxWidth='lg'>
      <Typography gutterBottom variant="h3">Errors for testing</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={()=> Trigger400error()
            .catch(err => console.log(err))}>
          Test 400 error</Button>  
        <Button variant="contained" onClick={()=> Trigger401error()
            .catch(err => console.log(err))}>
          Test 401 error</Button>  
        <Button variant="contained" onClick={()=> Trigger404error()
            .catch(err => console.log(err))}>
          Test 404 error</Button>  
        <Button variant="contained" onClick={()=> Trigger500error()
            .catch(err => console.log(err))}>
          Test 500 error</Button>  
        <Button variant="contained" onClick={()=> getValidationError()
            .catch(err => console.log(err))}>
          Test validation error</Button>  
      </ButtonGroup>  
      {validationErrors.length > 0 && (
        <Alert severity="error">
           <AlertTitle>Validation errors</AlertTitle>
          <List>
            {validationErrors.map(err => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
    
  )
}