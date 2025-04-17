import { DarkMode, LightMode, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

type Props = {
  toggleDarkMode : () => void;
  darkMode : boolean;
}

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

export default function NavBar({toggleDarkMode,darkMode} : Props) {
  return (
    <AppBar>
        <Toolbar sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
          <Box display='flex' alignItems='center'>
             <Typography component={NavLink} to='/' sx={{textDecoration:'none', color:'white'}} variant="h5">Re-Store</Typography>
              <IconButton onClick={toggleDarkMode}>
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
    </AppBar>
  )
}