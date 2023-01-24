import { Box, Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Close } from "@mui/icons-material"
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import DisplayCurrency from "../helpers/DisplayCurrency";
import { Product, ProductArray } from "../interfaces";

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
    data: ProductArray<Product>
}

function ShoppingCart({ isOpen, cartItems, data }: ShoppingCartProps ){
    const [total, setTotal] = useState<number>(0)
    const { closeCart } = useShoppingCart();

    console.log(data);
    let currentCurrency = CURRENCY.USD;

    useEffect(() => {
        setTotal(getTotal());
    }, [cartItems])

    const isCartEmpty = cartItems.length === 0


    const getTotal = () => {
        let total = 0;
        try {
            return cartItems.reduce((total, cartItem) => {
                return total + (cartItem.quantity ? data[cartItem.id].price * cartItem.quantity : 0);
            }, 0);

        } catch (e) {
            console.log(e);
        }
        return total;
    };


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
                        Estimated price: {DisplayCurrency(total, currentCurrency)}
                    </Typography>
                </Box>
                <Button disabled={isCartEmpty}>
                    Get your offer
                </Button>
            </Grid>
        </Drawer>
    )
}

export default ShoppingCart;