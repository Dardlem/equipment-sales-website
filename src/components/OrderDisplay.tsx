import { Box, Checkbox, Grid, Input, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fetchData from "../helpers/fetch";
import { Product } from "../interfaces";
import Orders from "../pages/Orders";
import Order from "../pages/Orders";



function OrderDisplay(orderId: Orders){
    const [data, setData] = useState<Array<Order>>([]);
    const [amount, setAmount] = useState<any>();
    const [productList, setProductList] = useState<Array<any>>([]);

    useEffect(() => {
        setData(orderId.orderId as unknown as Array<any>);
        console.log(data[0]);

        let temp: Array<Promise<any>> = [];
        let temp2: Array<number> = [];

        Object.keys(data).map((value: any) => {
            temp.push(fetchData('products/' + data[value].id + '/'));
            temp2.push(data[value].quantity as unknown as number);
        })

        setAmount(temp2);

        let filtered = temp.filter((item, index, array) => {
            return array.indexOf(item) === index;
        })

        filtered.map((promise) => {
            promise.then((value) => {
                setProductList((prev) => [...prev, value]);
            })
        })

        console.log(productList);

    }, [data])


    console.log(orderId)

    return(
        <Grid container justifyContent={"center"} margin={"2vmin"}>
            <Typography variant="h2">Order display</Typography>
            <Grid container direction="column">
                {
                    productList.map((value: Product, index: number) => {
                    console.log(productList);
                        return(
                            <Grid key={index} container direction="row" margin={"10px"}>
                                <Box sx={{ border: "black" }} borderRadius="20px">
                                    <TextField key={value.name} value={value.name} label={"Fixture name"} disabled />
                                    <TextField key={value + 'Amount'} value={amount[index]} label={"Amount"} disabled />
                                </Box>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}

export default OrderDisplay;