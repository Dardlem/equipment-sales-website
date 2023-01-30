import { Box, Button, Checkbox, Grid, Input, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fetchData from "../helpers/fetch";
import { removeFromDatabase } from "../helpers/firebase";
import { Product } from "../interfaces";
import Orders from "../pages/Orders";
import Order from "../pages/Orders";



function OrderDisplay(model: {order: Orders, orderId: string, customerId: string}){
    const [data, setData] = useState<Array<Order>>([]);
    const [amount, setAmount] = useState<any>();
    const [productList, setProductList] = useState<Array<any>>([]);

    useEffect(() => {
        setData([]);
        setProductList([]);
        setAmount([]);

        setData(model.order as unknown as Array<any>);

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
                if(productList.find((item) => item.id === value.id) === undefined){
                    setProductList((prev) => [...prev, value]);
                }
            })
        })

    }, [model.order, data])

    const handleRemove = () => {
        removeFromDatabase('orders/' + model.customerId + '/' + model.orderId + '/');
        window.location.reload();
    }

    return(
        <Grid container justifyContent={"center"} margin={"2vmin"}>
            <Typography variant="h2" margin={"100px"}>Замовлення</Typography>
            <Grid container direction="column">
                {
                    productList.map((value: Product, index: number) => {
                        console.log(productList); console.log(value);
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
                <Button color="error" onClick={handleRemove}>Видалити це замовлення</Button>
            </Grid>
        </Grid>
    )
}

export default OrderDisplay;