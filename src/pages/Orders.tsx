import { Box, Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDisplay from "../components/OrderDisplay";
import fetchData from "../helpers/fetch";
import { auth } from "../helpers/firebase";

//Order interface
//Customer -> Order -> ProductID, Quantity

interface Clients {
    [key: string]: {
        orders: Orders[]
    }
}

interface Orders {
    [key: string]:{
        order: Order
    }
}

interface Order {
    [key: number]:{
        id: string,
        quantity: number
    }
}

function Orders(){
    const [currentCustomer, setCurrentCustomer] = useState<string>('');
    const [currentOrder, setCurrentOrder] = useState<string>('');
    const [data, setData] = useState<any>();
    const navigate = useNavigate();


    useEffect(() => {
        const promise = () => {
            if(currentCustomer === ''){
                return fetchData("orders/");
            }
            else {
                    return fetchData("orders/" + currentCustomer + '/');}
        }

        promise().then((value) => {setData(value)});

    }, [currentCustomer, currentOrder])

    const orderDisplay = useMemo(() => {
        if(currentOrder === ''){
            return <Typography>Order not selected</Typography>
        } else {
            return <OrderDisplay orderId={data[currentOrder]}/>
        }
    }, [currentOrder])

    return(
        <>
            {
                auth.currentUser === null ? navigate("/login") :

                <Grid marginTop={"5vmin"} margin={"0 2vmin"}>
                    <Typography variant={"h1"} textAlign={"left"}>Orders</Typography>
                    <Grid container>
                        <Grid container direction={"row"} width={"100%"} flexWrap={"nowrap"}>
                            <Box>
                                <List>
                                    <ListItem><Typography variant={"body1"}>Selected Customer: {currentCustomer}</Typography></ListItem>
                                    <ListItem><Typography variant={"body1"}>Selected Order No.: {currentOrder}</Typography></ListItem>
                                    <Button onClick={() => {
                                        setCurrentCustomer('');
                                        setCurrentOrder('');
                                    }}>
                                        Clear selection
                                    </Button>
                                </List>
                                <Divider />
                                <Grid container direction="column" width="100%">
                                    {
                                        data === null ? <Typography>No orders found</Typography> :
                                        Object.keys(data).map((key: any, index: number) => {
                                            return(
                                                <Button key={index} onClick={() => {
                                                    if(currentCustomer === ''){
                                                        setCurrentCustomer(key);
                                                        console.log("customer set: ", key);
                                                    } else {
                                                        setCurrentOrder(key);
                                                        console.log("order set: ", key);
                                                    }
                                                }}>
                                                    <ListItem>
                                                        <Typography>{key}</Typography>
                                                    </ListItem>
                                                </Button>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        <Divider orientation="vertical" />
                            <Box>
                                {orderDisplay}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default Orders;