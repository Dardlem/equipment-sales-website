import { Box, Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Close } from "@mui/icons-material"
import CartItem from "./CartItem";
import fetchData from "../helpers/fetch";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import DisplayCurrency from "../helpers/DisplayCurrency";
import { Product, ProductArray, ProductList } from "../interfaces";

const drawerWidth = 340;

enum CURRENCY{
    USD = "$",
    EUR = "€",
    UAH = "₴",
}
//960eur
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

    let buttonState = true;

    useEffect(() => {
        setTotal(getTotal());
    }, [cartItems])

    const isCartEmpty = () => {
        if(cartItems.length === 0){
            return true;
        }
        else{
            return false;
        }
    }

    const getTotal = () => {
        let total: number = 0;

        try{
        console.log(data);
            cartItems.map((cartItem: CartItem) => {
                cartItem.quantity ? total += data[cartItem.id].price * cartItem.quantity : total += 0;
            })

            return total;
        }
        catch(e){
            console.log(e);
        }

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
                <Button disabled={isCartEmpty()}>
                    Get your offer
                </Button>
            </Grid>
        </Drawer>
    )
}

export default ShoppingCart;