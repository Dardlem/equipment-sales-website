import { Box, Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Close } from "@mui/icons-material"
import CartItem from "./CartItem";
import fetchData from "../helpers/fetch";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import DisplayCurrency from "../helpers/DisplayCurrency";

const drawerWidth = 340;

enum CURRENCY{
    USD = "$",
    EUR = "€",
    UAH = "₴",
}

type CartItem = {
    id: string
    quantity: number
}

type ShoppingCartProps = {
    isOpen: boolean,
    cartItems: CartItem[],
}

function ShoppingCart({ isOpen, cartItems }: ShoppingCartProps){
    const [total, setTotal] = useState<number>(0)
    const { closeCart } = useShoppingCart();

    let currentCurrency = CURRENCY.USD;

    useEffect(() => {
        setTotal(getTotal());
    }, [cartItems])

    const getTotal = () => {
        const data = fetchData();
        let total: number = 0;

        cartItems.map((cartItem: CartItem) => {
            total += data.products.find(product => product.id === cartItem.id)?.price! * cartItem.quantity
        })
        return total;
    }

    return (
        <Drawer
            open={isOpen}
            anchor='right'>
            <Grid padding="10px" width={drawerWidth} direction="column" container>
                <Box display="flex" justifyContent="space-between" paddingBottom="10px">
                    <Typography variant="h4">
                        Cart
                    </Typography>
                    <IconButton onClick={ closeCart }>
                        <Close />
                    </IconButton>
                </Box>
                <Box>
                    {
                        cartItems.map((cartItem) => {
                            return <CartItem key={cartItem.id} id={cartItem.id} quantity={cartItem.quantity} />
                        })
                    }
                </Box>
                <Box>
                    <Typography>
                        Total: {DisplayCurrency(total, currentCurrency)}
                    </Typography>
                </Box>
                <Button>
                    Get your offer
                </Button>
            </Grid>
        </Drawer>
    )
}

export default ShoppingCart;