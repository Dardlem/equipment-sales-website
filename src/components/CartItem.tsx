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
                direction="row"
                sx={{
                    padding: "10px 5px"
                }}
            >
                    <Typography marginBottom="10px" variant="h6">{data.name}</Typography>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" width="100%" flexWrap="nowrap">
                    <Grid container direction="column" width="auto%" margin="10px">
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
                    <Grid container direction="row" flexShrink="2" flexWrap="nowrap" alignItems="center">
                        <Box component="img" src={`${data.preview}`}
                            maxHeight="75px"borderRadius="25px" />
                        <IconButton onClick={ () => {removeFromCart(id)} }
                            sx={{
                                width: '20px',
                                height: '20px',
                                alignSelf: 'center',
                                margin: "5px"
                            }}
                        >
                            <Cancel />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CartItem;