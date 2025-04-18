import NavBar from "./NavBar";
import './styles.css'
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/Store";

function App() {
  const {darkMode} = useAppSelector(state => state.ui)  
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:palleteType,
      background:{
        default: (palleteType == 'light') ? '#eaeaea' : '#121212'
      }
  }})
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth={"xl"} >
        <NavBar />
        <Box sx={{
          minHeight: '100vh',
          background: darkMode ? 
          'radial-gradient(circle,#1e3aBa,#111B27)'
          :'radial-gradient(circle,#baecf9,#f0f9ff)'
        }}>  
          <Container maxWidth='xl' sx={{mt:8}}>
            <Outlet/>
          </Container>
        </Box>
       
      </Container>
    </ThemeProvider>
  )
}

export default App
