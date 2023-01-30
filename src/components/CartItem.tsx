import { Box, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import fetchData from "../helpers/fetch";
import { Product } from "../interfaces";
import { Cancel } from "@mui/icons-material"
import { useShoppingCart } from "../context/ShoppingCartContext";

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
        fetchData('products/' + id).then((data) => {
                setData(data)}
        );

    }, [id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if(newValue.indexOf('-') !== -1){
            return;
        }
        if(parseInt(newValue) < 0 || parseInt(newValue) > 2000){
            return;
        }

        setItemQuantity(id, parseInt(newValue, 10))
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
                            value={quantity}
                            inputProps={{
                                readOnly: false,
                                min: 50,
                                max: 20000,
                            }}
                            sx={{
                                width: '100%'
                            }}
                            onChange={handleChange} />
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