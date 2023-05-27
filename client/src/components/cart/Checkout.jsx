import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Typography,
} from '@mui/material';
import { useAuth } from '../../authentication/useAuth';

const Checkout = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();
    const [error, setError] = useState();

    const shippingMethods = ['Pick up in store'];
    const paymentMethods = ['Pay in the shop'];
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0]);
    // eslint-disable-next-line no-unused-vars
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    const handleShippingChange = (event) => {
        setSelectedShippingMethod(event.target.value);
    };
    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const sendOrder = () => {
        props.setIsOrderSubmitted(true);
        fetch('http://localhost:5000/order/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authKey}` },
        }).then((response) => {
            if (response.ok) {
                console.log(response);
            } else {
                return response.text().then((text) => {
                    setError(text);
                });
            }
        });
    };

    if (props.isOrderSubmitted) {
        return (
            <Container>
                <Typography variant="h4">Thank you for ordering!</Typography>
            </Container>
        );
    }

    return (
        <Container sx={authKey ? {} : { display: 'none' }}>
            <Typography variant="h5">Order summary</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Order Subtotal</TableCell>
                            <TableCell align="right">{props.totalPrice / 100} €</TableCell>
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
            <FormControl fullWidth sx={{ marginTop: 5 }}>
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

                <FormLabel id="demo-radio-buttons-group-label" sx={{ marginTop: 2 }}>
                    Payment Method
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={paymentMethods[0]}
                    name="radio-buttons-group"
                    onChange={handlePaymentChange}
                >
                    {paymentMethods.map((method) => (
                        <FormControlLabel key={`payment-${method}`} value={method} control={<Radio />} label={method} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Button
                disabled={props.totalPrice <= 0}
                variant="contained"
                sx={{ width: '100%', marginTop: 2 }}
                onClick={sendOrder}
            >
                Submit Order
            </Button>
            {error && <Typography>{error}</Typography>}
        </Container>
    );
};

Checkout.propTypes = {
    totalPrice: PropTypes.number,
    isOrderSubmitted: PropTypes.bool,
    setIsOrderSubmitted: PropTypes.func,
};

export default Checkout;
