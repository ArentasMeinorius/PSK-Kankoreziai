import React, {useEffect} from 'react';
import {Button, Container, TextField, Typography} from "@mui/material";
import OrderInfo from "../components/OrderInfo";
import {useSearchParams} from "react-router-dom";

const OrderStatus = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderId, setOrderId] = React.useState(searchParams.get('id'));
    const [order, setOrder] = React.useState(null);
    const [error, setError] = React.useState('');

    const getOrder = (id) => {
        fetch(`http://localhost:5000/order/${id}`)
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json().then((data) => {
                        setOrder(data);
                        setError('');
                    });
                }
                else {
                    response.json().then(error => {
                        console.log(error);
                        if (error.errors){
                            setError(error.errors.id[0]);
                        }
                        else {
                            setError(error[0].message);
                        }
                        setOrder(null);
                    });
                }
            })
    }

    useEffect(() => {
        if (orderId){
            getOrder(orderId)
        }
    }, []);


    const handleCheckAction = () => {

        if (orderId)
            getOrder(orderId);
        setSearchParams({["id"]: orderId});

    }

    return (
        <Container>
            <Typography variant={"h4"} sx={{
                mb: 2
            }}>
                Check your order status
            </Typography>
            <TextField
                required
                fullWidth
                id="order id"
                label="Order ID"
                defaultValue={orderId ? orderId : ''}
                onChange={(event) => setOrderId(event.target.value)}
            />
            <Button
                onClick={handleCheckAction}
                sx={{
                    mb: 2
                }}>
                Check status
            </Button>
            {order && (
                <OrderInfo order={order}/>
            )}
            {error && (
                <Typography color={"red"}>
                    Error: {error}
                </Typography>
            )}
        </Container>
    );
}

export default OrderStatus;