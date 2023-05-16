import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const DescriptionComponent = (description) => {
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    return (
        <Container sx={{ backgroundColor: '#153E00', color: 'white', padding: 5 }}>
            <Typography variant="h4" noWrap={true}>
                {description.name}
            </Typography>
            <Typography variant="h6">Price: {getMoneyFromCents(description.price.cents)} €</Typography>
            <Typography variant="body1">{description.description}</Typography>
            <Typography variant="h6">Quantity: {description.quantity}</Typography>
            <Button variant="contained" sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                Add to cart
            </Button>
        </Container>
    );
};

export default DescriptionComponent;
