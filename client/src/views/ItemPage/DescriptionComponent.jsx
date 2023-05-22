import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Container, Typography, useTheme } from '@mui/material';

const DescriptionComponent = ({ itemInfo }) => {
    const theme = useTheme();

    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    if (!itemInfo) {
        return <Typography>Loading...</Typography>;
    } else {
        return (
            <Container sx={{ backgroundColor: theme.palette.primary.dark, color: 'white', padding: 5 }}>
                <Typography variant="h4" noWrap={true}>
                    {itemInfo?.name}
                </Typography>
                <Typography variant="h6">Price: {getMoneyFromCents(itemInfo?.price?.cents)} €</Typography>
                <Typography variant="body1">{itemInfo?.description}</Typography>
                <Typography variant="h6">Current quantity: {itemInfo?.quantity?.units}</Typography>
                <Button variant="contained" sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                    Add to cart
                </Button>
            </Container>
        );
    }
};
DescriptionComponent.propTypes = {
    itemInfo: PropTypes.object,
};
export default DescriptionComponent;
