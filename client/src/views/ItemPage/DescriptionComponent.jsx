import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Container, Grid, Input, Typography, useTheme } from '@mui/material';
import { addToCart } from '../../cart/cartHandler';

const DescriptionComponent = ({ itemInfo }) => {
    const theme = useTheme();
    const [quantity, setQuantity] = React.useState(1);

    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    function addItemToCart(item, quantity) {
        addToCart(item, quantity);
    }

    if (!itemInfo) {
        return <Typography>Loading...</Typography>;
    } else {
        return (
            <Container sx={{ backgroundColor: theme.palette.primary.dark, color: 'white', padding: 5 }}>
                <Typography variant="h4" noWrap={true}>
                    {itemInfo?.name}
                </Typography>
                <Typography variant="h6">Price: {getMoneyFromCents(itemInfo?.price?.cents)} €</Typography>
                <Typography variant="body1">{itemInfo.description}</Typography>
                <Typography variant="h6">In stock: {itemInfo?.quantity?.units}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Input
                            variant="outlined"
                            type="number"
                            placeholder="Quantity"
                            onChange={(event) => setQuantity(event.target.value)}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" fullWidth onClick={() => addItemToCart(itemInfo, quantity)}>
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};
DescriptionComponent.propTypes = {
    itemInfo: PropTypes.object,
};
export default DescriptionComponent;
