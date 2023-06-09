import React, { useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import OrderInfo from '../components/OrderInfo';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../authentication/useAuth';

const OrderStatus = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderId, setOrderId] = React.useState(searchParams.get('id'));
    const [order, setOrder] = React.useState(null);
    const [error, setError] = React.useState('');
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();

    const getOrder = (id) => {
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authKey}` },
        }).then((response) => {
            if (response.ok) {
                return response.json().then((data) => {
                    setOrder(data);
                    setError('');
                });
            } else {
                response.json().then((error) => {
                    console.log(error);
                    if (error.errors) {
                        setError(error.errors.id[0]);
                    } else {
                        setError(error[0].message);
                    }
                    setOrder(null);
                });
            }
        });
    };

    useEffect(() => {
        if (orderId) {
            getOrder(orderId);
        }
    }, []);

    const handleCheckAction = () => {
        if (orderId) getOrder(orderId);
        setSearchParams({ ['id']: orderId });
    };

    if (!isAuthenticated) {
        return (
            <Container>
                <Typography
                    variant={'h4'}
                    sx={{
                        mb: 2,
                    }}
                >
                    Check your order status
                </Typography>
                <Typography variant={'body1'}>To see order status you need to be logged in.</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography
                variant={'h4'}
                sx={{
                    mb: 2,
                }}
            >
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
                    mb: 2,
                }}
            >
                Check status
            </Button>
            {order && <OrderInfo order={order} />}
            {error && <Typography color={'red'}>Error: {error}</Typography>}
        </Container>
    );
};

export default OrderStatus;
