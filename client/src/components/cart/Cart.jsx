import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    TableCell,
    TableContainer,
    Typography,
    Paper,
    TableHead,
    TableRow,
    TableBody,
    Button,
    ButtonGroup,
} from '@mui/material';
import { removeFromCart } from '../../cart/cartHandler';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [isCartSet, setIsCartSet] = useState(false);

    useEffect(() => {
        let cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
        setIsCartSet(true);
    }, []);

    useEffect(() => {
        if (!isCartSet) {
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        let total = 0;
        cart.forEach((cartElement) => {
            total += cartElement.item.price.cents * cartElement.quantity;
        });
        setTotal(total);
    }, [cart]);

    const removeItemFromCart = (elementToRemove) => {
        removeFromCart(elementToRemove);
        setCart(JSON.parse(localStorage.getItem('cart')));
    };

    function getPrice(cents) {
        return cents / 100;
    }

    function increaseQuantity(cartElement) {
        const tempCart = [...cart];
        const index = tempCart.indexOf(cartElement);
        tempCart[index].quantity++;
        setCart(tempCart);
    }

    function decreaseQuantity(cartElement) {
        const tempCart = [...cart];
        const index = tempCart.indexOf(cartElement);
        tempCart[index].quantity--;
        if (tempCart[index].quantity <= 0) {
            tempCart.splice(index, 1);
        }
        setCart(tempCart);
    }

    if (cart.length === 0) {
        return (
            <Container>
                <Typography variant="h4">Your cart is empty</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Item price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((cartElement, index) => (
                            <TableRow key={cartElement.item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="right">{cartElement.item.name}</TableCell>
                                <TableCell align="right">{cartElement.item.description}</TableCell>
                                <TableCell align="right">{getPrice(cartElement.item.price.cents)} €</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button onClick={() => decreaseQuantity(cartElement)}>-</Button>
                                        <Button disabled>{cartElement.quantity}</Button>
                                        <Button onClick={() => increaseQuantity(cartElement)}>+</Button>
                                    </ButtonGroup>
                                </TableCell>
                                <TableCell align="right">
                                    {getPrice(cartElement.item.price.cents * cartElement.quantity)} €
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => removeItemFromCart(cartElement.item)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell align="right">{getPrice(total)} €</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
