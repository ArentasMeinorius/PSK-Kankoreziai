import React from 'react';
import {
    Button, Container,
    FormControl,
    Grid, InputLabel, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";

export const EditOrder = ({currentOrder}) => {
    const navigate = useNavigate();
    const [order, setOrder] = React.useState(currentOrder);
    const [error, setError] = React.useState('');
    
    const orderStatus = [
        'Awaiting Payment',
        'Payment Accepted',
        'Payment Rejected',
        'Being Prepared',
        'Waiting For Pickup',
        'Completed'
    ];

    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    const calculateOrderPrice = (order) => {
        return getMoneyFromCents(order.orderProducts.reduce((acc, curr) => acc + (curr.product.price.cents) * (curr.quantity.units), 0));
    }
    
    const handleSave = () => {
        const orderBody = {
            itemsInOrder: order.orderProducts.map(product => ({
                productId: product.product.id,
                quantity: product.quantity
            })),
            orderStatus: order.orderStatus
        }
        fetch(`http://localhost:5000/order/${order.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderBody)
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/admin/order');
                }
                else {
                    return response.text().then(text => { setError(text)});
                }
            });
    }
    
    return (
        <Container>
            <Button href={'/admin/order/'}>
                Back
            </Button>
            <Grid container wrap={"nowrap"} sx={{
                overflow: "auto"
            }}>
                <Grid item xs={7} sx={{
                    border: 1,
                    borderColor: 'grey.500',
                    borderRadius: '16px',
                }}>
                    <TableContainer sx={{
                        m: 'auto'
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">ID</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.orderProducts.map((product, i) =>
                                    (<TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="right">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.product.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {getMoneyFromCents(product.product.price.cents)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.quantity.units}
                                            </TableCell>
                                            <TableCell align="right">
                                                {getMoneyFromCents(product.quantity.units * product.product.price.cents)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={5} sx={{
                    border: 1,
                    borderColor: 'grey.500',
                    borderRadius: '16px',
                    p: 3,
                    m: 1
                }}>
                    <Grid container direction={"column"} justify="center" align={"center"} sx={{ m: 'auto'}}>
                        <Grid item align="center" xs={12}>
                            <Typography variant={"h4"}>
                                Order summary
                            </Typography>
                            <Typography sx={{
                                mt: 2
                            }}>
                                Order id: {order.id}
                            </Typography>
                        </Grid>
                        <Grid item align="center" xs={12} sx={{
                            mt: 3
                        }}>
                            <TableContainer>
                                <Table sx={{
                                    border: 2,
                                    width: 300,
                                    mt: 2,
                                    borderColor: 'grey.500'
                                }}>
                                    <TableBody>
                                        <TableRow sx={{
                                            border: 1
                                        }}>
                                            <TableCell>
                                                Order subtotal
                                            </TableCell>
                                            <TableCell>
                                                {calculateOrderPrice(order)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} align={"left"} sx={{
                            my: 6
                        }}>
                            <Typography align={"left"} sx={{
                                mb: 1
                            }}>
                                Select status:
                            </Typography>
                            <FormControl align={"left"}>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select     
                                    labelId="status-select-label"
                                    id="status-select"
                                    value={order.orderStatus}
                                    align={"left"}
                                    onChange={(event) => (setOrder({...order, orderStatus: event.target.value}))}
                                >
                                    {orderStatus.map((status, i) => {
                                        return(
                                        <MenuItem key={i}
                                            value={i}>
                                            {status}
                                        </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={handleSave}>
                                Save changes
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {error && 
                <Typography>
                    {error}
            </Typography>
            }
        </Container>
    )
}

EditOrder.propTypes = {
    currentOrder: PropTypes.object,
};