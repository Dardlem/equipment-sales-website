import { AppBar, Box, IconButton, Menu, Toolbar, Typography, MenuItem, Tooltip, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import AdbIcon from "@mui/icons-material/Adb"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, Navigate } from "react-router-dom"
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import { useShoppingCart } from "../context/ShoppingCartContext";

const pages = ['Products', 'News', 'About'];

function Navbar() {
    const { openCart } = useShoppingCart();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return(
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        variant="dense"
                    >
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1}} />
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                                <Link to={`/`}>LOGO</Link>
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
                                        <Link to={`/${page}`}>
                                            <Typography textAlign={"center"}>{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                                    {/* <MenuItem key={'cart'} onClick={openCart}>
                                        <Typography textAlign={"center"}>Cart</Typography>
                                    </MenuItem> */}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: {xs: 'flex', md: 'none'}, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            // component="a"
                            // href=""
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
                            <Link to={'/'}>LOGO</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            <Grid container justifyContent="space-between">
                                <Box display="flex">
                                    {pages.map((page) => (
                                        <Link
                                            key={page}
                                            to={`/${page}`}
                                            onClick={handleCloseNavMenu}
                                        >
                                        <Typography sx={{ my: 2, color: 'white', paddingInline: "1vmin"}}>{page}</Typography>
                                        </Link>
                                    ))}
                                </Box>
                                {/* <Link
                                    key={'cart'}
                                    to={'/cart'}
                                    onClick={handleCloseNavMenu}
                                    >
                                    <ShoppingCart />
                                </Link> */}
                                <IconButton onClick={openCart} sx={{color: 'white'}}>
                                        <ShoppingCart />
                                </IconButton>
                            </Grid>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Navbar;