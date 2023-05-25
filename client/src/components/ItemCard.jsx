import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Typography } from '@mui/material';

const ItemCard = ({ product }) => {
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    return (
        <Link href={`/item/${product.id}`} variant="body1" underline="none">
            <Box
                component="img"
                src={product.thumbnail.link}
                sx={{
                    width: '85%',
                }}
            ></Box>
            <Typography variant="subtitle1" noWrap={true}>
                {product.name}
            </Typography>
            <Typography variant="body1">Price: {getMoneyFromCents(product.price.cents)} €</Typography>
        </Link>
    );
};

ItemCard.propTypes = {
    product: PropTypes.object,
};

export default ItemCard;
