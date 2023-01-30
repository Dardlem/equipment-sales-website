import { AppBar, Box, IconButton, Menu, Toolbar, Typography, MenuItem, Grid } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import SpaIcon from '@mui/icons-material/Spa';
import MenuIcon from "@mui/icons-material/Menu"
import { Link, NavLink } from "react-router-dom"
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Person } from "@mui/icons-material";
import { auth } from "../helpers/firebase";
import { useUser } from "../context/UserContext";

const pages = ['Products', 'News', 'About', 'Help'];

function Navbar() {
    const { openCart } = useShoppingCart();
    const { logOut } = useUser();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleLogOut = () => {
        logOut();
        handleCloseNavMenu;
        window.location.reload();
    }

    let activeStyle = {
        textDecoration: "underline"
    }

    React.useEffect(() => {}, [auth.currentUser])

    return(
        <>
            <AppBar position="absolute">
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        variant="dense"
                    >
                        <SpaIcon sx={{ color: "rgb(60, 179, 113)", display: { xs: 'none', md: 'flex'}, mr: 1}} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'Roboto',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                                <Link to={`/`}>SIA MAINSPRING</Link>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label=""
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                sx={{ mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <NavLink to={`/${page}`}>
                                            <Typography textAlign={"center"}>{page}</Typography>
                                        </NavLink>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <SpaIcon sx={{ display: {xs: 'flex', md: 'none'}, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecorations: 'none',
                            }}
                        >
                            <Link to={'/'}>SIA MAINSPRING</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            <Grid container justifyContent="space-between">
                                <Box display="flex">
                                    {pages.map((page) => (
                                        <NavLink
                                            style={({ isActive }) =>
                                                isActive ? activeStyle : undefined}  ////STYLING FOR ACTIVE LINKS
                                            key={page}
                                            to={`/${page}`}
                                            onClick={handleCloseNavMenu}
                                        >
                                        <Typography sx={{ my: 2, color: 'white', paddingInline: "1vmin"}}>{page}</Typography>
                                        </NavLink>
                                    ))}
                                </Box>

                                <Grid justifyContent={"center"} marginTop={"8px"}>
                                    <IconButton onClick={openCart} sx={{color: 'white'}}>
                                            <ShoppingCart />
                                    </IconButton>
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Person sx={{color: "white"}}/>
                                    </IconButton>
                                    <Menu open={Boolean(anchorElUser)}
                                    sx={{ mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                                    onClose={handleCloseUserMenu}
                                    >
                                        {
                                            auth.currentUser ?
                                            <div>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <NavLink to="/dashboard"><Typography>Admin Dashboard</Typography></NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <NavLink to="/cms"><Typography>CMS</Typography></NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <NavLink to="/orders"><Typography>Orders</Typography></NavLink>
                                            </MenuItem>
                                                <MenuItem onClick={handleLogOut}>
                                                    <Typography>Log out</Typography>
                                                </MenuItem>
                                            </div>
                                            :
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <NavLink to="login">
                                                    <Typography>Log in</Typography>
                                                </NavLink>
                                            </MenuItem>
                                        }
                                    </Menu>
                                </Grid>

                            </Grid>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Navbar;