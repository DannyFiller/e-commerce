import { DarkMode, LightMode, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { setDarkMode } from "./uiSlice";

const midLinks = [
  {title:'catalog', path:'/catalog'},
  {title:'about', path:'/about'},
  {title:'contact', path:'/contact'},
]
const rightLinks = [
  {title:'Login', path:'/login'},
  {title:'Register', path:'/register'},
]

const navStyles = {
  color:'inherit',
  typography:'h6',
  textDecoration:'none',
  '&:hover':{
    opacity:0.7
  },
  '&.active':{
    color:'#baecf9'
  }
}

export default function NavBar() {
  const {isLoading,darkMode} = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch();
  return (
    <AppBar>
        <Toolbar sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
          <Box display='flex' alignItems='center'>
             <Typography component={NavLink} to='/' sx={{textDecoration:'none', color:'white'}} variant="h5">Re-Store</Typography>
              <IconButton onClick={()=>dispatch(setDarkMode())}>
              {darkMode ? <DarkMode/> : <LightMode sx={{color:'yellow'}}/>}
              </IconButton>
          </Box>

          <List sx={{display:'flex'}}>
          {midLinks.map(({title,path}) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
          </List>

          <Box display='flex' alignItems='center'>
            <IconButton size="large" sx={{color:'inherit'}}>
              <Badge badgeContent='1' color="warning">
                <ShoppingCartOutlined/>
              </Badge>
            </IconButton>

            <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path}) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
            </List>
            </Box>
        </Toolbar>
        {isLoading && (
          <Box sx={{width:'100%'}}>
              <LinearProgress color="secondary"/>
          </Box>
        )}
    </AppBar>
  )
}