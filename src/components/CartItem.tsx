import { Box, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StoreData from "../data/StoreData.json"
import fetchData from "../helpers/fetch";
import { Product, ProductList } from "../interfaces";
import { Cancel } from "@mui/icons-material"
import { useShoppingCart } from "../context/ShoppingCartContext";
import DisplayCurrency from "../helpers/DisplayCurrency";

type CartItemProps = {
    id: string,
    quantity: number,
}

function CartItem({id, quantity}: CartItemProps){
    const { removeFromCart, setItemQuantity } = useShoppingCart();
    const [data, setData] = useState<Product>({
        name: 'Placeholder name',
        price: 0,
        description: 'a description',
        preview: 'a preview',
    });

    useEffect(() => {
        console.log("CartItem useEffect")
        let e = fetchData();

        e.products.map((product) => {
            if (product.id === id) {
                setData(product);
            }
        })

    }, [])

    const subTotal = () => {
        return quantity ? data.price * quantity : 0;
    }

    return(
        <Card sx={{ margin: "20px 5px" }}>
            <Grid container
                alignContent="center"
                justifyContent="center"
                sx={{
                    padding: "10px 5px"
                }}
            >
                <Grid container direction="row" justifyContent="space-between"
                    sx={{
                        padding: "10px 0px"
                    }}>
                    <Typography variant="body2">{data.name}</Typography>
                    <Typography variant="body2">Price: {data.price}</Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-between" alignContent="center">
                    <Grid container direction="column" width="60%">
                        <TextField
                            id="quantity-field"
                            label={"Quantity"}
                            type="number"
                            defaultValue={quantity}
                            InputProps={{
                                readOnly: false
                            }}
                            sx={{
                                width: '100%'
                            }}
                            onChange={(newValue) => { setItemQuantity(id, parseInt(newValue.target.value, 10)) }} />
                            <Typography variant="body2">SubTotal: {DisplayCurrency(subTotal())}</Typography>
                    </Grid>
                    <Box component="img" src={`${data.preview}`}
                        maxHeight="75px"borderRadius="25px" />
                    <IconButton onClick={ () => {removeFromCart(id)} }
                        sx={{
                            width: '20px',
                            height: '20px',
                            alignSelf: 'center',
                        }}
                    >
                        <Cancel />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CartItem;