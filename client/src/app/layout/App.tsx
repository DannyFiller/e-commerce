import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import NavBar from "./NavBar";
import './styles.css'
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";


function App() {
  const [products,setProducts] = useState<Product[]>([]);
  const [darkMode,setDarkMode] = useState(false);
  // const darkMode = true;
  
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:palleteType,
      background:{
        default: (palleteType == 'light') ? '#eaeaea' : '#121212'
      }
  }})

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth={"xl"} >
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Box sx={{
          minHeight: '100vh',
          background: darkMode ? 
          'radial-gradient(circle,#1e3aBa,#111B27)'
          :'radial-gradient(circle,#baecf9,#f0f9ff)'
        }}>  
          <Container maxWidth='xl' sx={{mt:8}}>
            <Catalog products={products} />
          </Container>
        </Box>
       
      </Container>
    </ThemeProvider>
  )
}

export default App
