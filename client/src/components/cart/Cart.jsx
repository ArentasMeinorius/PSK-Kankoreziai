import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
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
import { useCart } from '../../cart/useCart';
import { useAuth } from '../../authentication/useAuth';

export default function Cart(props) {
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
        props.setTotal(tempTotal);
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

    if (props.isOrderSubmitted || cart.length === 0) {
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

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '650' }} aria-label="spanning table">
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
                            <TableCell align="right">{getPrice(props.total)} €</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
Cart.propTypes = {
    total: PropTypes.number,
    setTotal: PropTypes.func,
    isOrderSubmitted: PropTypes.bool,
};
