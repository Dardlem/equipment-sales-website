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

    }, [currentCustomer, currentOrder, data])

    const orderDisplay = useMemo(() => {
        if(currentOrder !== ''){
            return <OrderDisplay order={data[currentOrder]} orderId={currentOrder} customerId={currentCustomer} />
        }
    }, [currentOrder]);

    return(
        <>
            {
                auth.currentUser === null ? navigate("/login") :

                data === undefined ? <Typography margin={"10vmin"} variant="h1">Завантаження...</Typography> :

                <Grid marginTop={"5vmin"} margin={"0 2vmin"}>
                    <Typography variant={"h1"} textAlign={"left"}>Замовлення</Typography>
                    <Grid container>
                        <Grid container direction={"row"} width={"100%"} flexWrap={"nowrap"}>
                            <Box>
                                <List>
                                    <ListItem><Typography variant={"body1"}>Обраний клієнт: {currentCustomer}</Typography></ListItem>
                                    <ListItem><Typography variant={"body1"}>Обране замовлення: {currentOrder}</Typography></ListItem>
                                    <Button onClick={() => {
                                        setCurrentCustomer('');
                                        setCurrentOrder('');
                                    }}>
                                        Очистити вибірку
                                    </Button>
                                </List>
                                <Divider />
                                <Grid container direction="column" width="100%">
                                    {
                                        data === null ? <Typography>Заказів не знайдено</Typography> :
                                        Object.keys(data).map((key: any, index: number) => {
                                            return(
                                                <Button key={index} onClick={() => {
                                                    if(currentCustomer === ''){
                                                        setCurrentCustomer(key);
                                                    } else {
                                                        setCurrentOrder(key);
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
                                {
                                    currentOrder === '' ? null : orderDisplay
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default Orders;