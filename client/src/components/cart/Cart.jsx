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
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from '@mui/material';
import { removeFromCart } from '../../cart/cartHandler';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [isCartSet, setIsCartSet] = useState(false);

    const shippingMethods = ['Pick up in store'];
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0]);

    const paymentMethods = ['Pay in the shop'];
    // eslint-disable-next-line no-unused-vars
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState('');

    const handleShippingChange = (event) => {
        setSelectedShippingMethod(event.target.value);
    };

    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const sendOrder = () => {
        const orderBody = {
            itemsInOrder: cart.map((product) => ({
                productId: product.item.id,
                quantity: product.item.quantity,
            })),
            orderStatus: 0,
        };
        console.log(orderBody);

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderBody),
        }).then((response) => {
            if (response.ok) {
                //nav to orders? if we have such page
            } else {
                return response.text().then((text) => {
                    setError(text);
                });
            }
        });
    };

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

            <FormControl fullWidth sx={{ margin: 5 }}>
                <InputLabel id="demo-simple-select-label">Shipping Options</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedShippingMethod}
                    label="Shipping Options"
                    onChange={handleShippingChange}
                >
                    {shippingMethods.map((type) => (
                        <MenuItem key={`shipping-${type}`} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Container>
                <Typography variant="h5">Order summary</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Order Subtotal</TableCell>
                                <TableCell align="right">{getPrice(total)} €</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Taxes</TableCell>
                                <TableCell align="right">----</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shipping</TableCell>
                                <TableCell align="right">----</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Payment Method</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={paymentMethods[0]}
                        name="radio-buttons-group"
                        onChange={handlePaymentChange}
                    >
                        {paymentMethods.map((method) => (
                            <FormControlLabel
                                key={`payment-${method}`}
                                value={method}
                                control={<Radio />}
                                label={method}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Button variant="contained" sx={{ margin: 2 }} onClick={sendOrder}>
                    Submit
                </Button>
                {error && <Typography>{error}</Typography>}
            </Container>
        </Container>
    );
}
