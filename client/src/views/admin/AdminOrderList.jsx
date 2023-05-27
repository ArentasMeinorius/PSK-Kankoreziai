import {AdminHeader} from "../../components/admin/AdminHeader";
import React, { useState, useEffect } from 'react';
import {Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function AdminOrderList() {
    const [orders, setOrders] = useState([]);

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
    
    useEffect(() => {
        fetch('http://localhost:5000/Order')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setOrders(data);
            });
    }, []);

    return (
        <Container>
            <AdminHeader/>
            <TableContainer sx={{
                m:'auto',
                mt: 3,
                p: 2,
                width: "90%",
                border: 1,
                borderColor: 'primary.main',
                borderRadius: '16px',
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Order price</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Created</TableCell>
                            <TableCell align="right">Updated</TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {orders.map((order) => 
                        (<TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">
                                {calculateOrderPrice(order)}
                            </TableCell>
                            <TableCell align="right">
                                {orderStatus[order.orderStatus]}
                            </TableCell>
                            <TableCell align="right">
                                {order.createdAt}
                            </TableCell>
                            <TableCell align="right">
                                {order.updatedAt}
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    href={`/admin/order/${order.id}`}>
                                    Edit order
                                </Button>
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