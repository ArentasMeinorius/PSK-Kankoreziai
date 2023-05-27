import React from 'react';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import PropTypes from "prop-types";

const OrderInfo = ({order}) => {

    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    const orderStatus = [
        'Awaiting Payment',
        'Payment Accepted',
        'Payment Rejected',
        'Being Prepared',
        'Waiting For Pickup',
        'Completed'
    ];


    return (
        <Container>
            <Typography variant={"h6"}>
                Order status: <b>{orderStatus[order.orderStatus]}</b>
            </Typography>
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
        </Container>
    )
}

OrderInfo.propTypes = {
    order: PropTypes.object
}

export default OrderInfo;