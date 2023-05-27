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
import { useCart } from '../../cart/useCart';
import { useAuth } from '../../authentication/useAuth';

export default function Cart() {
    const [total, setTotal] = useState(0);

    const [error, setError] = useState();
    const shippingMethods = ['Pick up in store'];
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0]);

    const paymentMethods = ['Pay in the shop'];
    // eslint-disable-next-line no-unused-vars
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    // eslint-disable-next-line no-unused-vars

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
    /*
    useEffect(() => {
        let cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
        setIsCartSet(true);
    }, []);
*/
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [cart, isLoaded, cartError, addToCart, removeFromCart, setQuantity] = useCart();
    const [products, setProducts] = useState([]);

    async function getProductById(guid) {
        const product = await fetch(`http://localhost:5000/product/${guid}`).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        });
        return product;
    }

    useEffect(() => {
        let tempTotal = 0;
        for (var i = 0; i < products.length; i++) {
            tempTotal += products[i].price.cents * cart[i].quantity.units;
        }
        setTotal(tempTotal);
    }, [products]);

    const removeItemFromCart = (cartElement) => {
        removeFromCart(cartElement);
    };

    function getPrice(cents) {
        return cents / 100;
    }

    function increaseQuantity(cartElement) {
        console.log('increaseQuantity');
        setQuantity(cartElement, cartElement.quantity.units + 1);
    }

    function decreaseQuantity(cartElement) {
        console.log('dec');
        if (cartElement.quantity.units <= 1) {
            setQuantity(cartElement, 1);
        }
        setQuantity(cartElement, cartElement.quantity.units - 1);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const tempProducts = [];
            for (const cartElement of cart) {
                const product = await getProductById(cartElement.productId);
                tempProducts.push(product);
            }
            setProducts(tempProducts);
        };
        fetchProducts();
    }, [cart]);

    if (!isAuthenticated) {
        return <Typography variant="h4">Please login to see your cart</Typography>;
    }

    if (cart.length === 0) {
        return (
            <Container>
                <Typography variant="h4">Your cart is empty</Typography>
            </Container>
        );
    }

    if (products.length != cart.length) {
        return (
            <Container>
                <Typography variant="h4">Loading...</Typography>
            </Container>
        );
    }

    console.log(products);

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
                        {products.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="right">{product.name}</TableCell>
                                <TableCell align="right">{product.description}</TableCell>
                                <TableCell align="right">{getPrice(product.price.cents)} €</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button onClick={() => decreaseQuantity(cart[index])}>-</Button>
                                        <Button disabled>{cart[index].quantity.units}</Button>
                                        <Button onClick={() => increaseQuantity(cart[index])}>+</Button>
                                    </ButtonGroup>
                                </TableCell>
                                <TableCell align="right">
                                    {getPrice(product.price.cents * cart[index].quantity.units)} €
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => removeItemFromCart(cart[index])}>
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
