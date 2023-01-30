import { Box, Button, Drawer, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Close } from "@mui/icons-material"
import CartItem from "./CartItem";
import { Product, ProductArray } from "../interfaces";
import placeOrder from "../helpers/placeOrder";
import { useState } from "react";

const drawerWidth = 340;

type CartItem = {
    id: string
    quantity: number
}

type ShoppingCartProps = {
    isOpen: boolean,
    cartItems: CartItem[],
    data: ProductArray<Product>
}

type Order = {
    id: string[],
    quantity: number[]
}

function ShoppingCart({ isOpen, cartItems, data }: ShoppingCartProps ){
    const { closeCart, removeAllFromCart } = useShoppingCart();
    const [orderHasBeenPlaced, setOrderHasBeenPlaced] = useState<boolean>(false);
    const [customerId, setCustomerId] = useState<string>("");

    const isCartEmpty = cartItems.length === 0;
    const isCustomerEmpty = customerId === "";

    const buttonEnabler = () => {
        if (isCartEmpty || isCustomerEmpty) {
            return true;
        } else return false;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^$|^[\sa-zA-Z0-9\u0400-\u04FF]+$/;

        if(event.target.value.match(regex)){
            setCustomerId(event.target.value)
        }

    }

    const handleRequestPlacement = () => {
        const order: any = cartItems.map((cartItem) => {
            return {
                id: cartItem.id,
                quantity: cartItem.quantity
            }
        })
        setOrderHasBeenPlaced(true);
        placeOrder(customerId.replace(/\s/g, ''), order);
        removeAllFromCart();
    }


    return (
        <Drawer
            open={isOpen}
            anchor='right'>
            <Grid padding="10px" width={drawerWidth} direction="column" container>
                {
                    orderHasBeenPlaced ?
                    <Grid container alignContent={"center"}>
                        <Typography variant="h4">Ваше замовлення розміщено!</Typography>
                        <Button onClick={() => {setOrderHasBeenPlaced(false)}}>Ок</Button>
                    </Grid>

                    :

                    <Grid container direction={"column"}>
                        <Box display="flex" justifyContent="space-between" paddingBottom="10px">
                            <Typography variant="h4">
                                Замовлення
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
                        {
                            isCartEmpty ? <Typography variant="h6">Добавте продукт</Typography> :

                            <TextField
                                id="customer-id"
                                type="text"
                                sx = {{ margin: "10px 0px"}}
                                label="Посилання на ваш проект"
                                value={customerId}
                                inputProps={{ readOnly: false }}
                                onChange={handleChange}
                            />

                        }

                        <Button disabled={buttonEnabler()} onClick={handleRequestPlacement}>
                            Оформити замовлення
                        </Button>
                    </Grid>
                }

            </Grid>
        </Drawer>
    )
}

export default ShoppingCart;