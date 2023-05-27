import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export const AdminOrder = ({ order }) => {
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    const calculateOrderPrice = () => {
        return getMoneyFromCents(
            order.orderProducts.reduce((acc, curr) => acc + curr.product.price.cents * curr.quantity, 0)
        );
    };

    return (
        <TableRow>
            <TableCell>{order.id}</TableCell>
            <TableCell>{calculateOrderPrice()}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
                <Button>Cancel order</Button>
            </TableCell>
        </TableRow>
    );
};

AdminOrder.propTypes = {
    order: PropTypes.object,
};
